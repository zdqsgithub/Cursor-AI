import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import * as contentController from '../controllers/content.controller';

const router = Router();

// Public routes
router.get('/', contentController.getAllPublicContent);
router.get('/featured', contentController.getFeaturedContent);
router.get('/creator/:creatorId', contentController.getContentByCreator);
router.get('/:contentId', contentController.getContentById);

// Protected routes
router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('contentType').isIn(['article', 'video', 'image', 'audio']).withMessage('Invalid content type'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('currency').isIn(['ETH', 'USDC']).withMessage('Invalid currency'),
    body('isPublic').isBoolean().withMessage('isPublic must be a boolean'),
  ],
  validateRequest,
  contentController.createContent
);

router.put(
  '/:contentId',
  authenticate,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('contentType').optional().isIn(['article', 'video', 'image', 'audio']).withMessage('Invalid content type'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('currency').optional().isIn(['ETH', 'USDC']).withMessage('Invalid currency'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean'),
  ],
  validateRequest,
  contentController.updateContent
);

router.delete('/:contentId', authenticate, contentController.deleteContent);

// Content access
router.get('/access/:contentId', authenticate, contentController.checkContentAccess);

export default router; 