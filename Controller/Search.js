
import Movie from '../Models/Movie.js';

// Search for movies
export const searchMovies = async (req, res) => {
  try {
    const { query, genre, rating, releaseYear, sortBy } = req.query;

    // Build the search criteria
    const searchCriteria = {
      ...(query && { $text: { $search: query } }),
      ...(genre && { genre: genre }),
      ...(rating && { averageRating: { $gte: rating } }),
      ...(releaseYear && { releaseDate: { $gte: new Date(releaseYear + '-01-01'), $lt: new Date((parseInt(releaseYear) + 1) + '-01-01') } })
    };

    const movies = await Movie.find(searchCriteria)
      .sort(sortBy ? { [sortBy]: -1 } : { averageRating: -1 }) // Default sort by rating
      .populate('director')
      .populate('cast');

    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error searching movies', error: error.message });
  }
};

// Get top movies by genre
export const getTopMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const topMovies = await Movie.find({ genre: genre })
      .sort({ averageRating: -1 })
      .limit(10);

    res.json(topMovies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching top movies by genre', error: error.message });
  }
};

// Get top movies of the month
export const getTopMoviesOfTheMonth = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    const topMovies = await Movie.find({
      releaseDate: { $gte: startOfMonth, $lt: endOfMonth }
    }).sort({ averageRating: -1 }).limit(10);

    res.json(topMovies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching top movies of the month', error : error.message });
  }
};