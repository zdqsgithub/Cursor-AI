import { Router } from 'express';
import { body } from 'express-validator';
import { 
  getCurrentUser, 
  updateCurrentUser, 
  getUserById, 
  getUserContent 
} from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get current user
router.get('/me', getCurrentUser);

// Update current user
router.put(
  '/me',
  [
    body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('walletAddress').optional().isEthereumAddress().withMessage('Please provide a valid Ethereum address'),
    validateRequest
  ],
  updateCurrentUser
);

// Get user by ID
router.get('/:userId', getUserById);

// Get user's content
router.get('/:userId/content', getUserContent);

// Placeholder route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User routes are working',
    user: req.user
  });
});

export default router; 