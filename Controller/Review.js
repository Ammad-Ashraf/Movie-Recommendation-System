// src/controllers/reviewController.js
import Movie from '../Models/Movie.js';
import Review from '../Models/Review.js';
import User from '../Models/User.js';

// Add or update a review
export const addOrUpdateReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, content } = req.body;
    const userId = req.user._id;

    let review = await Review.findOne({ user: userId, movie: movieId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.content = content;
    } else {
      // Create new review
      review = new Review({
        user: userId,
        movie: movieId,
        rating,
        content
      });
    }

    await review.save();

    // Update movie's average rating
    const movie = await Movie.findById(movieId);
    const reviews = await Review.find({ movie: movieId });
    const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    movie.averageRating = averageRating;
    await movie.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error adding/updating review', error: error.message });
  }
};

// Get reviews for a movie
export const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ movie: movieId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username');

    const total = await Review.countDocuments({ movie: movieId });

    res.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalReviews: total
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get review highlights
export const getReviewHighlights = async (req, res) => {
  try {
    const { movieId } = req.params;

    const topRated = await Review.find({ movie: movieId })
      .sort({ rating: -1 })
      .limit(3)
      .populate('user', 'username');

    const mostDiscussed = await Review.find({ movie: movieId })
      .sort({ likes: -1 })
      .limit(3)
      .populate('user', 'username');

    res.json({ topRated, mostDiscussed });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching review highlights', error: error.message });
  }
};

// Like a review
export const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.likes.includes(userId)) {
      review.likes = review.likes.filter(id => id.toString() !== userId.toString());
    } else {
      review.likes.push(userId);
    }

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error liking review', error: error.message });
  }
};