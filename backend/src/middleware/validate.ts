import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

/**
 * Middleware to validate request data using express-validator
 * Checks for validation errors and returns a 400 response if any are found
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((error: ValidationError) => ({
        field: error.type === 'field' ? error.path : '',
        message: error.msg
      }))
    });
    return;
  }
  
  next();
}; 