import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Connect wallet to user account
export const connectWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { walletAddress } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid wallet address'
      });
    }

    // Update user with wallet address
    const user = await prisma.user.update({
      where: { id: userId },
      data: { walletAddress }
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Connect wallet error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get wallet status
export const getWalletStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      connected: !!user.walletAddress,
      walletAddress: user.walletAddress
    });
  } catch (error) {
    console.error('Get wallet status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Verify signature
export const verifySignature = async (req: Request, res: Response) => {
  try {
    const { message, signature, address } = req.body;

    if (!message || !signature || !address) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);

    const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();

    res.status(200).json({
      success: true,
      isValid
    });
  } catch (error) {
    console.error('Verify signature error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Verify transaction
export const verifyTransaction = async (req: Request, res: Response) => {
  try {
    const { txHash } = req.body;

    if (!txHash) {
      return res.status(400).json({
        success: false,
        error: 'Transaction hash is required'
      });
    }

    // Connect to Ethereum provider
    const provider = new ethers.JsonRpcProvider(
      process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key'
    );

    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      return res.status(200).json({
        success: true,
        verified: false,
        status: 'pending',
        message: 'Transaction is pending or not found'
      });
    }

    // Check if transaction was successful
    const verified = receipt.status === 1;

    res.status(200).json({
      success: true,
      verified,
      status: verified ? 'confirmed' : 'failed',
      blockNumber: receipt.blockNumber,
      confirmations: receipt.confirmations
    });
  } catch (error) {
    console.error('Verify transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Process payment
export const processPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { txHash, amount, currency, recipientId, contentId, subscriptionTierId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!txHash || !amount || !currency || !recipientId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Verify transaction on blockchain
    const provider = new ethers.JsonRpcProvider(
      process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key'
    );

    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt || receipt.status !== 1) {
      return res.status(400).json({
        success: false,
        error: 'Transaction failed or not confirmed'
      });
    }

    // Determine transaction type
    let type = 'TIP';
    if (contentId) {
      type = 'PPV';
    } else if (subscriptionTierId) {
      type = 'SUBSCRIPTION';
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        senderId: userId,
        receiverId: recipientId,
        amount: parseFloat(amount),
        currency,
        txHash,
        status: 'COMPLETED',
        type: type as any,
        contentId,
        subscriptionId: subscriptionTierId ? undefined : undefined // Will be set later if subscription
      }
    });

    // If subscription payment, create or update subscription
    if (type === 'SUBSCRIPTION' && subscriptionTierId) {
      // Get subscription tier
      const tier = await prisma.subscriptionTier.findUnique({
        where: { id: subscriptionTierId }
      });

      if (!tier) {
        return res.status(404).json({
          success: false,
          error: 'Subscription tier not found'
        });
      }

      // Calculate subscription period (1 month from now)
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      // Create or update subscription
      const subscription = await prisma.subscription.create({
        data: {
          creatorId: recipientId,
          subscriberId: userId,
          tierId: subscriptionTierId,
          startDate,
          endDate,
          status: 'ACTIVE'
        }
      });

      // Update transaction with subscription ID
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { subscriptionId: subscription.id }
      });
    }

    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}; 