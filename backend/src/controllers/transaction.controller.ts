import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/errors';

const prisma = new PrismaClient();

/**
 * Get user's transactions
 */
export const getMyTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        recipient: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        content: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.transaction.count({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
    });

    res.status(200).json({
      success: true,
      data: {
        transactions,
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
      message: 'Failed to fetch transactions',
      error: (error as Error).message,
    });
  }
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { transactionId } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        recipient: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        content: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
          },
        },
      },
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
      return;
    }

    // Check if user is involved in the transaction
    if (transaction.senderId !== userId && transaction.recipientId !== userId) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to view this transaction',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: (error as Error).message,
    });
  }
};

/**
 * Record a new transaction
 */
export const recordTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { transactionHash, amount, currency, type, recipientId, status, contentId, metadata } = req.body;

    // Check if recipient exists
    const recipient = await prisma.user.findUnique({
      where: {
        id: recipientId,
      },
    });

    if (!recipient) {
      res.status(404).json({
        success: false,
        message: 'Recipient not found',
      });
      return;
    }

    // Check if content exists if contentId is provided
    if (contentId) {
      const content = await prisma.content.findUnique({
        where: {
          id: contentId,
        },
      });

      if (!content) {
        res.status(404).json({
          success: false,
          message: 'Content not found',
        });
        return;
      }
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        transactionHash,
        amount,
        currency,
        type,
        status,
        senderId: userId,
        recipientId,
        contentId,
        metadata,
      },
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record transaction',
      error: (error as Error).message,
    });
  }
};

/**
 * Update transaction status
 */
export const updateTransactionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { transactionId } = req.params;
    const { status } = req.body;

    // Check if transaction exists and user is involved
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
      return;
    }

    // Only sender or admin can update transaction status
    if (transaction.senderId !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to update this transaction',
      });
      return;
    }

    // Update transaction
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update transaction status',
      error: (error as Error).message,
    });
  }
};

/**
 * Get earnings summary
 */
export const getEarningsSummary = async (req: Request, res: Response): Promise<void> => {
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
        message: 'Only creators can access earnings',
      });
      return;
    }

    // Get total earnings
    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        recipientId: userId,
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    // Get earnings by type
    const earningsByType = await prisma.$queryRaw`
      SELECT type, SUM(amount) as total, COUNT(*) as count
      FROM "Transaction"
      WHERE "recipientId" = ${userId} AND status = 'completed'
      GROUP BY type
    `;

    // Get earnings by currency
    const earningsByCurrency = await prisma.$queryRaw`
      SELECT currency, SUM(amount) as total, COUNT(*) as count
      FROM "Transaction"
      WHERE "recipientId" = ${userId} AND status = 'completed'
      GROUP BY currency
    `;

    res.status(200).json({
      success: true,
      data: {
        totalEarnings: totalEarnings._sum.amount || 0,
        totalTransactions: totalEarnings._count,
        earningsByType,
        earningsByCurrency,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch earnings summary',
      error: (error as Error).message,
    });
  }
};

/**
 * Get earnings by period
 */
export const getEarningsByPeriod = async (req: Request, res: Response): Promise<void> => {
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
        message: 'Only creators can access earnings',
      });
      return;
    }

    const { period } = req.params;
    let startDate: Date;
    const endDate = new Date();

    // Set start date based on period
    switch (period) {
      case 'day':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0); // Beginning of time
    }

    // Get earnings for the period
    const earnings = await prisma.transaction.findMany({
      where: {
        recipientId: userId,
        status: 'completed',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total
    const total = earnings.reduce((sum: number, transaction: { amount: number }) => sum + transaction.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        period,
        startDate,
        endDate,
        total,
        count: earnings.length,
        transactions: earnings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch earnings by period',
      error: (error as Error).message,
    });
  }
}; 