import express from 'express';
import { addNews, updateNews, deleteNews, getNews, getAllNews } from '../Controller/NewsController.js';

const router = express.Router();

router.post('/', addNews); // Create a new news article
router.put('/:id', updateNews); // Update an existing news article
router.delete('/:id', deleteNews); // Delete a news article
router.get('/:id', getNews); // Get a single news article
router.get('/', getAllNews); // Get all news articles

export default router;