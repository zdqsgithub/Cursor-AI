import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class for application-specific errors
 */
export class CustomError extends Error {
  statusCode: number;
  errors?: Record<string, string>[];

  constructor(message: string, statusCode = 500, errors?: Record<string, string>[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    
    // Set the prototype explicitly
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

/**
 * Error handler middleware
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

/**
 * Not found middleware
 */
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Not found - ${req.originalUrl}`,
  });
}; 