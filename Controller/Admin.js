import Movie from '../Models/Movie.js';
import Review from '../Models/Review.js';
import User from '../Models/User.js';

// Get most popular movies
export const getPopularMovies = async (req, res) => {
  try {
    const popularMovies = await Movie.find()
      .sort({ viewCount: -1 })
      .limit(10);
    res.json(popularMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular movies', error: error.message });
  }
};

// Get user activity
export const getUserActivity = async (req, res) => {
  try {
    const users = await User.find().populate('wishlist');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activity', error: error.message });
  }
};

// Get trending genres
export const getTrendingGenres = async (req, res) => {
  try {
    const trendingGenres = await Movie.aggregate([
      { $unwind: '$genre' },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(trendingGenres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending genres', error: error.message });
  }
};

// Get most searched actors
export const getMostSearchedActors = async (req, res) => {
  // This assumes you have a search log or similar tracking
  // Implement your logic here
  res.json({ message: 'Most searched actors data' });
};

// Get user engagement patterns
export const getUserEngagementPatterns = async (req, res) => {
  // Implement your logic to gather user engagement data
  res.json({ message: 'User  engagement patterns data' });
};

// Moderate reviews
export const moderateReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user movie');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews for moderation', error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};