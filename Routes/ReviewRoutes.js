
import express from 'express';
import { authenticate } from '../Middleware/auth.js';
import { validateReview, validate } from '../Middleware/validate.js';
import {
  addOrUpdateReview,
  getMovieReviews,
  getReviewHighlights,
  likeReview
} from '../Controller/Review.js';

const router = express.Router();

router.post('/:movieId', authenticate, validateReview, validate, addOrUpdateReview);
router.get('/movie/:movieId', getMovieReviews);
router.get('/highlights/:movieId', getReviewHighlights);
router.post('/like/:reviewId', authenticate, likeReview);

export default router;