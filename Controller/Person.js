
import Person from '../Models/Person.js';
import { saveFile, deleteFile } from '../Utils/fileStorage.js';
import mongoose from 'mongoose';

export const addPerson = async (req, res) => {
  try {
    let personData = req.body;
    
    // Handle filmography
    if (personData.filmography && typeof personData.filmography === 'string') {
      personData.filmography = JSON.parse(personData.filmography);
    }
    if (Array.isArray(personData.filmography)) {
      personData.filmography = personData.filmography.map(item => ({
        ...item,
        movie: mongoose.Types.ObjectId.isValid(item.movie) ? new mongoose.Types.ObjectId(item.movie) : null
      }));
      // Filter out any null values
      personData.filmography = personData.filmography.filter(item => item.movie !== null);
    }

    // Handle awards
    if (personData.awards && typeof personData.awards === 'string') {
      personData.awards = JSON.parse(personData.awards);
    }

    if (req.file) {
      const filePath = await saveFile(req.file);
      personData.photo = filePath;
    }

    // Remove _id field if it exists
    delete personData._id;

    const person = new Person(personData);
    await person.save();

    res.status(201).json(person);
  } catch (error) {
    console.error('Error adding person:', error);
    res.status(400).json({ message: 'Error adding person', error: error.message });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      const filePath = await saveFile(req.file);
      updateData.photo = filePath;

      // Delete old photo if exists
      const oldPerson = await Person.findById(id);
      if (oldPerson.photo) {
        await deleteFile(oldPerson.photo);
      }
    }

    const person = await Person.findByIdAndUpdate(id, updateData, { new: true });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    res.status(400).json({ message: 'Error updating person', error: error.message });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndDelete(id);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Delete photo if exists
    if (person.photo) {
      await deleteFile(person.photo);
    }

    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting person', error: error.message });
  }
};

/**
 * Get a single person
 * @route GET /api/people/:id
 */
export const getPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id).populate('filmography.movie');

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching person', error: error.message });
  }
};

/**
 * Get all people with pagination
 * @route GET /api/people
 */
export const getAllPeople = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const people = await Person.find()
      .skip(skip)
      .limit(limit)
      .populate('filmography.movie');

    const total = await Person.countDocuments();

    res.json({
      people,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPeople: total
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching people', error: error.message });
  }
};