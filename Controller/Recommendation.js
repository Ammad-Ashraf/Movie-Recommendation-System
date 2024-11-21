// src/controllers/recommendationController.js
import Movie from '../Models/Movie.js';
import User from '../Models/User.js';
import Review from '../Models/Review.js';

// Helper function to get movie recommendations based on genres
const getRecommendationsByGenres = async (genres, limit = 10) => {
  return await Movie.find({ genres: { $in: genres } })
    .sort({ averageRating: -1 })
    .limit(limit);
};

// Helper function to get similar movies
const getSimilarMovies = async (movieId, limit = 5) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return [];
  }

  return await Movie.find({
    _id: { $ne: movieId },
    $or: [
      { genres: { $in: movie.genres } },
      { director: movie.director }
    ]
  })
    .sort({ averageRating: -1 })
    .limit(limit);
};

export const getSimilarTitles = async (req, res) => {
  try {
    const { movieId } = req.params;
    const similarMovies = await getSimilarMovies(movieId);
    res.json(similarMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching similar titles', error: error.message });
  }
};

export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('favoriteGenres');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userGenres = user.favoriteGenres.map(genre => genre.name);
    const recommendations = await getRecommendationsByGenres(userGenres);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personalized recommendations', error: error.message });
  }
};

export const getTrendingMovies = async (req, res) => {
  try {
    const trendingMovies = await Movie.find()
      .sort({ viewCount: -1, averageRating: -1 })
      .limit(10);

    res.json(trendingMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending movies', error: error.message });
  }
};

export const getTopRatedMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ averageRating: -1 })
      .limit(10);

    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top rated movies', error: error.message });
  }
};