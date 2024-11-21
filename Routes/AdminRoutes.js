import express from 'express';
import { isAdmin } from '../Middleware/auth.js';
import {
  getPopularMovies,
  getUserActivity,
  getTrendingGenres,
  getMostSearchedActors,
  getUserEngagementPatterns,
  moderateReviews,
  deleteReview
} from '../Controller/Admin.js';

const router = express.Router();

// Admin routes
router.get('/popular-movies', isAdmin, getPopularMovies); // Get most popular movies
router.get('/user-activity', isAdmin, getUserActivity); // Get user activity
router.get('/trending-genres', isAdmin, getTrendingGenres); // Get trending genres
router.get('/most-searched-actors', isAdmin, getMostSearchedActors); // Get most searched actors
router.get('/user-engagement', isAdmin, getUserEngagementPatterns); // Get user engagement patterns
router.get('/moderate-reviews', isAdmin, moderateReviews); // Moderate reviews
router.delete('/reviews/:id', isAdmin, deleteReview); // Delete a review

export default router;