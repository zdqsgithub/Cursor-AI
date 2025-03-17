import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

// Get user's transactions
router.get('/my-transactions', authenticate, transactionController.getMyTransactions);

// Get transaction by ID
router.get('/:transactionId', authenticate, transactionController.getTransactionById);

// Record a new transaction
router.post(
  '/',
  authenticate,
  [
    body('transactionHash').notEmpty().withMessage('Transaction hash is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isIn(['ETH', 'USDC']).withMessage('Invalid currency'),
    body('type').isIn(['subscription', 'content', 'tip']).withMessage('Invalid transaction type'),
    body('recipientId').notEmpty().withMessage('Recipient ID is required'),
    body('status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
    body('metadata').optional().isObject().withMessage('Metadata must be an object'),
  ],
  validateRequest,
  transactionController.recordTransaction
);

// Update transaction status
router.put(
  '/:transactionId/status',
  authenticate,
  [
    body('status').isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
  ],
  validateRequest,
  transactionController.updateTransactionStatus
);

// Get earnings summary
router.get('/earnings/summary', authenticate, transactionController.getEarningsSummary);

// Get earnings by period
router.get('/earnings/:period', authenticate, transactionController.getEarningsByPeriod);

export default router; 