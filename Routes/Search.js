
import express from 'express';
import { searchMovies, getTopMoviesByGenre, getTopMoviesOfTheMonth } from '../Controller/Search.js';

const router = express.Router();

router.route('/search')
  .get(searchMovies); // Search for movies

router.route('/top/:genre')
  .get(getTopMoviesByGenre); // Get top movies by genre

router.route('/top/month')
  .get(getTopMoviesOfTheMonth); // Get top movies of the month

export default router;