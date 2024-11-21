
import express from 'express';
import { authenticate } from '../Middleware/auth.js';
import { apiLimiter } from '../Middleware/ratelimiter.js';
import {
  getSimilarTitles,
  getPersonalizedRecommendations,
  getTrendingMovies,
  getTopRatedMovies
} from '../Controller/Recommendation.js';

const router = express.Router();

router.get('/similar/:movieId', apiLimiter, getSimilarTitles);
router.get('/personalized', authenticate, apiLimiter, getPersonalizedRecommendations);
router.get('/trending', apiLimiter, getTrendingMovies);
router.get('/top-rated', apiLimiter, getTopRatedMovies);

export default router;