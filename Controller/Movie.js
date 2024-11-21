
import Movie from '../Models/Movie.js';
import Person from '../Models/Person.js';
import logger from '../Utils/logger.js';

// Add a new movie
export const addMovie = async (req, res) => {
  try {
    const movieData = req.body;
    if (req.file) {
      movieData.coverPhoto = req.file.path;
    }
    const movie = new Movie(movieData);
    await movie.save();
    logger.info(`New movie added: ${movie.title}`);
    res.status(201).json(movie);
  } catch (error) {
    logger.error(`Error adding movie: ${error.message}`);
    res.status(400).json({ message: 'Error adding movie', error: error.message });
  }
};

// Update a movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.coverPhoto = req.file.path;
    }
    const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true });
    if (!movie) {
      logger.warn(`Attempt to update non-existent movie: ${id}`);
      return res.status(404).json({ message: 'Movie not found' });
    }
    logger.info(`Movie updated: ${movie.title}`);
    res.json(movie);
  } catch (error) {
    logger.error(`Error updating movie: ${error.message}`);
    res.status(400).json({ message: 'Error updating movie', error: error.message });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      logger.warn(`Attempt to delete non-existent movie: ${id}`);
      return res.status(404).json({ message: 'Movie not found' });
    }
    logger.info(`Movie deleted: ${movie.title}`);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting movie: ${error.message}`);
    res.status(400).json({ message: 'Error deleting movie', error: error.message });
  }
};

// Get a single movie
export const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id)
      .populate('director')
      .populate('cast');
    if (!movie) {
      logger.warn(`Attempt to fetch non-existent movie: ${id}`);
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    logger.error(`Error fetching movie: ${error.message}`);
    res.status(400).json({ message: 'Error fetching movie', error: error.message });
  }
};

// Get all movies (with pagination)
export const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .skip(skip)
      .limit(limit)
      .populate('director')
      .populate('cast');

    const total = await Movie.countDocuments();

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    });
  } catch (error) {
    logger.error(`Error fetching movies: ${error.message}`);
    res.status(400).json({ message: 'Error fetching movies', error: error.message });
  }
};

// Add person (actor, director, crew member)
export const addPerson = async (req, res) => {
  try {
    const personData = req.body;
    if (req.file) {
      personData.photo = req.file.path;
    }
    const person = new Person(personData);
    await person.save();
    logger.info(`New person added: ${person.name}`);
    res.status(201).json(person);
  } catch (error) {
    logger.error(`Error adding person: ${error.message}`);
    res.status(400).json({ message: 'Error adding person', error: error.message });
  }
};

// Update person
export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.photo = req.file.path;
    }
    const person = await Person.findByIdAndUpdate(id, updateData, { new: true });
    if (!person) {
      logger.warn(`Attempt to update non-existent person: ${id}`);
      return res.status(404).json({ message: 'Person not found' });
    }
    logger.info(`Person updated: ${person.name}`);
    res.json(person);
  } catch (error) {
    logger.error(`Error updating person: ${error.message}`);
    res.status(400).json({ message: 'Error updating person', error: error.message });
  }
};

// Get person details
export const getPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id).populate('filmography.movie');
    if (!person) {
      logger.warn(`Attempt to fetch non-existent person: ${id}`);
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    logger.error(`Error fetching person: ${error.message}`);
    res.status(400).json({ message: 'Error fetching person', error: error.message });
  }
};

