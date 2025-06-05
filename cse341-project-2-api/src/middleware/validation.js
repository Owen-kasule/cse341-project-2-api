import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Validation rules for creating/updating items
export const itemValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .trim(),
    
    body('description')
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 5, max: 500 })
      .withMessage('Description must be between 5 and 500 characters')
      .trim(),
    
    body('price')
      .isNumeric()
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other'])
      .withMessage('Category must be one of: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other'),
    
    body('stock')
      .isInt({ min: 0 })
      .withMessage('Stock must be a non-negative integer')
  ];
};

// Validation rule for MongoDB ObjectId
export const validateObjectId = () => {
  return [
    param('id')
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('Invalid item ID');
        }
        return true;
      })
  ];
};

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};