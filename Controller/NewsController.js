import News from '../Models/News.js';
import logger from '../Utils/logger.js';

// Add a new news article
export const addNews = async (req, res) => {
  try {
    const newsData = req.body;
    const news = new News(newsData);
    await news.save();
    logger.info(`New article added: ${news.title}`);
    res.status(201).json(news);
  } catch (error) {
    logger.error(`Error adding news: ${error.message}`);
    res.status(400).json({ message: 'Error adding news', error: error.message });
  }
};

// Update a news article
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const news = await News.findByIdAndUpdate(id, updateData, { new: true });
    if (!news) {
      logger.warn(`Attempt to update non-existent news article: ${id}`);
      return res.status(404).json({ message: 'News article not found' });
    }
    logger.info(`News article updated: ${news.title}`);
    res.json(news);
  } catch (error) {
    logger.error(`Error updating news: ${error.message}`);
    res.status(400).json({ message: 'Error updating news', error: error.message });
  }
};

// Delete a news article
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      logger.warn(`Attempt to delete non-existent news article: ${id}`);
      return res.status(404).json({ message: 'News article not found' });
    }
    logger.info(`News article deleted: ${news.title}`);
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting news: ${error.message}`);
    res.status(400).json({ message: 'Error deleting news', error: error.message });
  }
};

// Get a single news article
export const getNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id)
      .populate('author')
      .populate('relatedMovies')
      .populate('relatedPeople');
    if (!news) {
      logger.warn(`Attempt to fetch non-existent news article: ${id}`);
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    logger.error(`Error fetching news: ${error.message}`);
    res.status(400).json({ message: 'Error fetching news', error: error.message });
  }
};

// Get all news articles (with pagination)
export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const news = await News.find()
      .skip (skip)
      .limit(limit)
      .populate('author')
      .populate('relatedMovies')
      .populate('relatedPeople');

    const totalNews = await News.countDocuments();
    res.json({
      total: totalNews,
      page,
      limit,
      news
    });
  } catch (error) {
    logger.error(`Error fetching all news: ${error.message}`);
    res.status(400).json({ message: 'Error fetching news', error: error.message });
  }
};