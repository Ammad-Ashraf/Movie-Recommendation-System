import express from 'express';
import { createList, getAllLists, followList, unfollowList, getList } from '../Controller/listController.js';
import { authenticate,isAdmin } from '../Middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(authenticate, createList) // Create a new list
  .get(getAllLists); // Get all public lists

router.route('/:id')
  .get(getList) // Get a single list
  .post(authenticate, followList) // Follow a list
  .delete(authenticate, unfollowList); // Unfollow a list

export default router;