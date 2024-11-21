import List from '../Models/List.js';
import User from '../Models/User.js';

// Create a new list
export const createList = async (req, res) => {
  try {
    const { name, description, movies, isPublic } = req.body;
    const list = new List({
      name,
      description,
      movies,
      creator: req.user._id,
      isPublic
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: 'Error creating list', error: error.message });
  }
};

// Get all lists (with pagination)
export const getAllLists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const lists = await List.find({ isPublic: true })
      .skip(skip)
      .limit(limit)
      .populate('creator', 'username');

    const total = await List.countDocuments({ isPublic: true });

    res.json({
      lists,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalLists: total
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching lists', error: error.message });
  }
};

// Follow a list
export const followList = async (req, res) => {
  try {
    const { listId } = req.params;
    const userId = req.user._id;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (!list.followers.includes(userId)) {
      list.followers.push(userId);
      await list.save();
    }

    res.json(list);
  } catch (error) {
    res.status(400).json({ message: 'Error following list', error: error.message });
  }
};

// Unfollow a list
export const unfollowList = async (req, res) => {
  try {
    const { listId } = req.params;
    const userId = req.user._id;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.followers = list.followers.filter(id => id.toString() !== userId.toString());
    await list.save();

    res.json(list);
  } catch (error) {
    res.status(400).json({ message: 'Error unfollowing list', error: error.message });
  }
};

// Get a single list
export const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id).populate('movies').populate('creator', 'username');

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.json(list);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching list', error: error.message });
  }
};