import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - director
 *         - releaseDate
 *         - runtime
 *         - synopsis
 *         - coverPhoto
 *         - ageRating
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The title of the movie
 *           maxLength: 200
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: The genres of the movie
 *         director:
 *           type: string
 *           description: The ObjectId of the director
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of ObjectIds of cast members
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: The release date of the movie
 *         releaseStatus:
 *           type: string
 *           enum: [announced, coming_soon, released]
 *           description: The current release status of the movie
 *         trailer:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             releaseDate:
 *               type: string
 *               format: date
 *           description: Movie trailer information
 *         runtime:
 *           type: number
 *           minimum: 1
 *           description: The runtime of the movie in minutes
 *         synopsis:
 *           type: string
 *           maxLength: 2000
 *           description: A brief summary of the movie plot
 *         averageRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: The average rating of the movie
 *         coverPhoto:
 *           type: string
 *           description: URL to the cover photo of the movie
 *         trivia:
 *           type: array
 *           items:
 *             type: string
 *             maxLength: 500
 *           description: Array of trivia items about the movie
 *         goofs:
 *           type: array
 *           items:
 *             type: string
 *             maxLength: 500
 *           description: Array of goofs or errors in the movie
 *         soundtrack:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *               artist:
 *                 type: string
 *                 maxLength: 200
 *           description: Array of soundtrack items
 *         ageRating:
 *           type: string
 *           enum: [G, PG, PG-13, R, NC-17]
 *           description: The age rating of the movie
 *         parentalGuidance:
 *           type: string
 *           maxLength: 1000
 *           description: Parental guidance information
 *         boxOffice:
 *           type: object
 *           properties:
 *             openingWeekend:
 *               type: number
 *             totalEarnings:
 *               type: number
 *             internationalRevenue:
 *               type: number
 *           description: Box office performance of the movie
 *         awards:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 200
 *               category:
 *                 type: string
 *                 maxLength: 200
 *               year:
 *                 type: number
 *                 minimum: 1888
 *           description: Awards won by the movie
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the movie was added to the database
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the movie information was last updated
 */

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  genre: [{
    type: String,
    required: [true, 'At least one genre is required']
  }],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: [true, 'Director is required']
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }],
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  releaseStatus: {
    type: String,
    enum: ['announced', 'coming_soon', 'released'],
    default: 'announced'
  },
  trailer: {
    url: String,
    releaseDate: Date
  },
  runtime: {
    type: Number,
    required: [true, 'Runtime is required'],
    min: [1, 'Runtime must be at least 1 minute']
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis is required'],
    maxlength: [2000, 'Synopsis cannot exceed 2000 characters']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  coverPhoto: {
    type: String,
    required: [true, 'Cover photo URL is required']
  },
  trivia: [{
    type: String,
    maxlength: [500, 'Trivia item cannot exceed 500 characters']
  }],
  goofs: [{
    type: String,
    maxlength: [500, 'Goof item cannot exceed 500 characters']
  }],
  soundtrack: [{
    title: {
      type: String,
      required: true,
      maxlength: [200, 'Song title cannot exceed 200 characters']
    },
    artist: {
      type: String,
      required: true,
      maxlength: [200, 'Artist name cannot exceed 200 characters']
    }
  }],
  ageRating: {
    type: String,
    required: [true, 'Age rating is required'],
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17']
  },
  parentalGuidance: {
    type: String,
    maxlength: [1000, 'Parental guidance cannot exceed 1000 characters']
  },
  boxOffice: {
    openingWeekend: Number,
    totalEarnings: Number,
    internationalRevenue: Number
  },
  awards: [{
    name: {
      type: String,
      required: true,
      maxlength: [200, 'Award name cannot exceed 200 characters']
    },
    category: {
      type: String,
      required: true,
      maxlength: [200, 'Award category cannot exceed 200 characters']
    },
    year: {
      type: Number,
      required: true,
      min: 1888 // First movie was made in 1888
    }
  }]
}, {
  timestamps: true
});

movieSchema.index({ title: 'text', synopsis: 'text' });

export default mongoose.model('Movie', movieSchema);
