import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import * as subscriptionController from '../controllers/subscription.controller';

const router = Router();

// Get user's subscriptions
router.get('/my-subscriptions', authenticate, subscriptionController.getMySubscriptions);

// Get creator's subscribers
router.get('/my-subscribers', authenticate, subscriptionController.getMySubscribers);

// Subscribe to a creator
router.post(
  '/subscribe',
  authenticate,
  [
    body('creatorId').notEmpty().withMessage('Creator ID is required'),
    body('planId').optional(),
    body('transactionHash').notEmpty().withMessage('Transaction hash is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isIn(['ETH', 'USDC']).withMessage('Invalid currency'),
  ],
  validateRequest,
  subscriptionController.subscribe
);

// Renew subscription
router.post(
  '/renew',
  authenticate,
  [
    body('subscriptionId').notEmpty().withMessage('Subscription ID is required'),
    body('transactionHash').notEmpty().withMessage('Transaction hash is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isIn(['ETH', 'USDC']).withMessage('Invalid currency'),
  ],
  validateRequest,
  subscriptionController.renewSubscription
);

// Cancel subscription
router.post(
  '/cancel',
  authenticate,
  [
    body('subscriptionId').notEmpty().withMessage('Subscription ID is required'),
  ],
  validateRequest,
  subscriptionController.cancelSubscription
);

// Check subscription status
router.get('/status/:creatorId', authenticate, subscriptionController.checkSubscriptionStatus);

export default router; 