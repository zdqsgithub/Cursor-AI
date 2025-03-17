import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/errors';

const prisma = new PrismaClient();

/**
 * Get user's subscriptions
 */
export const getMySubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        subscriberId: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            profileImage: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscriptions',
      error: (error as Error).message,
    });
  }
};

/**
 * Get creator's subscribers
 */
export const getMySubscribers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    // Check if user is a creator
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.role !== 'creator') {
      res.status(403).json({
        success: false,
        message: 'Only creators can access their subscribers',
      });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const subscribers = await prisma.subscription.findMany({
      where: {
        creatorId: userId,
        status: 'active',
      },
      include: {
        subscriber: {
          select: {
            id: true,
            username: true,
            profileImage: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.subscription.count({
      where: {
        creatorId: userId,
        status: 'active',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        subscribers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: (error as Error).message,
    });
  }
};

/**
 * Subscribe to a creator
 */
export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { creatorId, planId, transactionHash, amount, currency } = req.body;

    // Check if creator exists
    const creator = await prisma.user.findUnique({
      where: {
        id: creatorId,
        role: 'creator',
      },
    });

    if (!creator) {
      res.status(404).json({
        success: false,
        message: 'Creator not found',
      });
      return;
    }

    // Check if user is trying to subscribe to themselves
    if (userId === creatorId) {
      res.status(400).json({
        success: false,
        message: 'You cannot subscribe to yourself',
      });
      return;
    }

    // Check if subscription already exists
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        subscriberId: userId,
        creatorId,
      },
    });

    // Set subscription duration (30 days by default)
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        transactionHash,
        amount,
        currency,
        type: 'subscription',
        status: 'completed',
        senderId: userId,
        recipientId: creatorId,
        metadata: {
          planId,
        },
      },
    });

    let subscription;

    if (existingSubscription) {
      // Update existing subscription
      subscription = await prisma.subscription.update({
        where: {
          id: existingSubscription.id,
        },
        data: {
          status: 'active',
          expiresAt,
          planId,
          lastTransactionId: transaction.id,
        },
      });
    } else {
      // Create new subscription
      subscription = await prisma.subscription.create({
        data: {
          subscriberId: userId,
          creatorId,
          status: 'active',
          expiresAt,
          planId,
          lastTransactionId: transaction.id,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        subscription,
        transaction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create subscription',
      error: (error as Error).message,
    });
  }
};

/**
 * Renew subscription
 */
export const renewSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { subscriptionId, transactionHash, amount, currency } = req.body;

    // Check if subscription exists and belongs to the user
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
        subscriberId: userId,
      },
      include: {
        creator: true,
      },
    });

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
      return;
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        transactionHash,
        amount,
        currency,
        type: 'subscription',
        status: 'completed',
        senderId: userId,
        recipientId: subscription.creatorId,
        metadata: {
          planId: subscription.planId,
        },
      },
    });

    // Set new expiration date (30 days from now)
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Update subscription
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: 'active',
        expiresAt,
        lastTransactionId: transaction.id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        subscription: updatedSubscription,
        transaction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to renew subscription',
      error: (error as Error).message,
    });
  }
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { subscriptionId } = req.body;

    // Check if subscription exists and belongs to the user
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
        subscriberId: userId,
      },
    });

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
      return;
    }

    // Update subscription status
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: 'cancelled',
      },
    });

    res.status(200).json({
      success: true,
      data: updatedSubscription,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel subscription',
      error: (error as Error).message,
    });
  }
};

/**
 * Check subscription status
 */
export const checkSubscriptionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { creatorId } = req.params;

    // Check if creator exists
    const creator = await prisma.user.findUnique({
      where: {
        id: creatorId,
        role: 'creator',
      },
    });

    if (!creator) {
      res.status(404).json({
        success: false,
        message: 'Creator not found',
      });
      return;
    }

    // Check if subscription exists
    const subscription = await prisma.subscription.findFirst({
      where: {
        subscriberId: userId,
        creatorId,
      },
    });

    if (!subscription) {
      res.status(200).json({
        success: true,
        isSubscribed: false,
        message: 'No subscription found',
      });
      return;
    }

    // Check if subscription is active and not expired
    const now = new Date();
    const isActive = subscription.status === 'active' && subscription.expiresAt > now;

    res.status(200).json({
      success: true,
      isSubscribed: isActive,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        expiresAt: subscription.expiresAt,
        isExpired: subscription.expiresAt <= now,
        planId: subscription.planId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check subscription status',
      error: (error as Error).message,
    });
  }
}; 