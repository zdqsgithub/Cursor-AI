import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/errors';

const prisma = new PrismaClient();

/**
 * Get all public content
 */
export const getAllPublicContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const content = await prisma.content.findMany({
      where: {
        isPublic: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    const total = await prisma.content.count({
      where: {
        isPublic: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        content,
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
      message: 'Failed to fetch content',
      error: (error as Error).message,
    });
  }
};

/**
 * Get featured content
 */
export const getFeaturedContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await prisma.content.findMany({
      where: {
        isPublic: true,
        isFeatured: true,
      },
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured content',
      error: (error as Error).message,
    });
  }
};

/**
 * Get content by creator
 */
export const getContentByCreator = async (req: Request, res: Response): Promise<void> => {
  try {
    const { creatorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const content = await prisma.content.findMany({
      where: {
        creatorId,
        isPublic: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    const total = await prisma.content.count({
      where: {
        creatorId,
        isPublic: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        content,
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
      message: 'Failed to fetch creator content',
      error: (error as Error).message,
    });
  }
};

/**
 * Get content by ID
 */
export const getContentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contentId } = req.params;

    const content = await prisma.content.findUnique({
      where: {
        id: contentId,
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
    });

    if (!content) {
      res.status(404).json({
        success: false,
        message: 'Content not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: (error as Error).message,
    });
  }
};

/**
 * Create new content
 */
export const createContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { title, description, contentType, contentUrl, thumbnailUrl, price, currency, isPublic } = req.body;

    const content = await prisma.content.create({
      data: {
        title,
        description,
        contentType,
        contentUrl,
        thumbnailUrl,
        price,
        currency,
        isPublic,
        creatorId: userId,
      },
    });

    res.status(201).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create content',
      error: (error as Error).message,
    });
  }
};

/**
 * Update content
 */
export const updateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { contentId } = req.params;
    const { title, description, contentType, contentUrl, thumbnailUrl, price, currency, isPublic } = req.body;

    // Check if content exists and belongs to the user
    const existingContent = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!existingContent) {
      res.status(404).json({
        success: false,
        message: 'Content not found',
      });
      return;
    }

    if (existingContent.creatorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to update this content',
      });
      return;
    }

    const updatedContent = await prisma.content.update({
      where: {
        id: contentId,
      },
      data: {
        title,
        description,
        contentType,
        contentUrl,
        thumbnailUrl,
        price,
        currency,
        isPublic,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update content',
      error: (error as Error).message,
    });
  }
};

/**
 * Delete content
 */
export const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { contentId } = req.params;

    // Check if content exists and belongs to the user
    const existingContent = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!existingContent) {
      res.status(404).json({
        success: false,
        message: 'Content not found',
      });
      return;
    }

    if (existingContent.creatorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this content',
      });
      return;
    }

    await prisma.content.delete({
      where: {
        id: contentId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete content',
      error: (error as Error).message,
    });
  }
};

/**
 * Check if user has access to content
 */
export const checkContentAccess = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { contentId } = req.params;

    // Get the content
    const content = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
      include: {
        creator: true,
      },
    });

    if (!content) {
      res.status(404).json({
        success: false,
        message: 'Content not found',
      });
      return;
    }

    // If content is public, grant access
    if (content.isPublic) {
      res.status(200).json({
        success: true,
        hasAccess: true,
        reason: 'Content is public',
      });
      return;
    }

    // If user is the creator, grant access
    if (content.creatorId === userId) {
      res.status(200).json({
        success: true,
        hasAccess: true,
        reason: 'User is the creator',
      });
      return;
    }

    // Check if user has an active subscription to the creator
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        subscriberId: userId,
        creatorId: content.creatorId,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (activeSubscription) {
      res.status(200).json({
        success: true,
        hasAccess: true,
        reason: 'User has an active subscription',
        subscription: activeSubscription,
      });
      return;
    }

    // Check if user has purchased this specific content
    const contentPurchase = await prisma.transaction.findFirst({
      where: {
        senderId: userId,
        recipientId: content.creatorId,
        contentId,
        type: 'content',
        status: 'completed',
      },
    });

    if (contentPurchase) {
      res.status(200).json({
        success: true,
        hasAccess: true,
        reason: 'User has purchased this content',
        transaction: contentPurchase,
      });
      return;
    }

    // User does not have access
    res.status(200).json({
      success: true,
      hasAccess: false,
      reason: 'No subscription or purchase found',
      content: {
        id: content.id,
        title: content.title,
        description: content.description,
        thumbnailUrl: content.thumbnailUrl,
        price: content.price,
        currency: content.currency,
        creator: {
          id: content.creator.id,
          username: content.creator.username,
          profileImage: content.creator.profileImage,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check content access',
      error: (error as Error).message,
    });
  }
}; 