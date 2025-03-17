import { Router } from 'express';
import { body } from 'express-validator';
import { 
  connectWallet, 
  getWalletStatus, 
  verifySignature, 
  verifyTransaction,
  processPayment
} from '../controllers/blockchain.controller';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = Router();

// Connect wallet
router.post(
  '/connect-wallet',
  authenticate,
  [
    body('walletAddress').notEmpty().withMessage('Wallet address is required'),
    validateRequest
  ],
  connectWallet
);

// Get wallet status
router.get('/wallet-status', authenticate, getWalletStatus);

// Verify signature
router.post(
  '/verify-signature',
  [
    body('message').notEmpty().withMessage('Message is required'),
    body('signature').notEmpty().withMessage('Signature is required'),
    body('address').notEmpty().withMessage('Address is required'),
    validateRequest
  ],
  verifySignature
);

// Verify transaction
router.post(
  '/verify-transaction',
  [
    body('txHash').notEmpty().withMessage('Transaction hash is required'),
    validateRequest
  ],
  verifyTransaction
);

// Process payment
router.post(
  '/process-payment',
  authenticate,
  [
    body('txHash').notEmpty().withMessage('Transaction hash is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('recipientId').notEmpty().withMessage('Recipient ID is required'),
    validateRequest
  ],
  processPayment
);

export default router; 