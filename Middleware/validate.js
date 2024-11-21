
import { body, param, validationResult } from 'express-validator';

export const validateMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('genre').isArray().withMessage('Genre must be an array'),
  body('director').isMongoId().withMessage('Invalid director ID'),
  body('cast').isArray().withMessage('Cast must be an array'),
  body('releaseDate').isISO8601().withMessage('Invalid release date'),
  body('runtime').isInt({ min: 1 }).withMessage('Runtime must be a positive integer'),
  body('synopsis').notEmpty().withMessage('Synopsis is required'),
  body('ageRating').isIn(['G', 'PG', 'PG-13', 'R', 'NC-17']).withMessage('Invalid age rating'),
];
export const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('content').notEmpty().withMessage('Review content is required')
    .isLength({ max: 1000 }).withMessage('Review content cannot exceed 1000 characters'),
];

export const validatePerson = [
  body('name').notEmpty().withMessage('Name is required'),
  body('birthDate').optional().isISO8601().withMessage('Invalid birth date'),
 
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};