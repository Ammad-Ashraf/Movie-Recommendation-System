import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *           minLength: 3
 *           maxLength: 30
 *         email:
 *           type: string
 *           description: The email of the user
 *           format: email
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *           minLength: 8
 *         profile:
 *           type: object
 *           properties:
 *             favoriteGenres:
 *               type: array
 *               items:
 *                 type: string
 *             favoriteActors:
 *               type: array
 *               items:
 *                 type: string
 *                 description: ObjectId of Person
 *             bio:
 *               type: string
 *               maxLength: 500
 *             avatar:
 *               type: string
 *         wishlist:
 *           type: array
 *           items:
 *             type: string
 *             description: ObjectId of Movie
 *         ratings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 description: ObjectId of Movie
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *             description: ObjectId of Review
 *         customLists:
 *           type: array
 *           items:
 *             type: string
 *             description: ObjectId of List
 *         followedLists:
 *           type: array
 *           items:
 *             type: string
 *             description: ObjectId of List
 *         notifications:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               read:
 *                 type: boolean
 *         notificationPreferences:
 *           type: object
 *           properties:
 *             emailNotifications:
 *               type: boolean
 *             upcomingReleases:
 *               type: boolean
 *             trailerReleases:
 *               type: boolean
 *             favoriteGenreReleases:
 *               type: boolean
 *             favoriteActorMovies:
 *               type: boolean
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  profile: {
    favoriteGenres: [String],
    favoriteActors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    avatar: String
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  ratings: [{
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  customLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  followedLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  notifications: [{
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }],
  notificationPreferences: {
    emailNotifications: { type: Boolean, default: true },
    upcomingReleases: { type: Boolean, default: true },
    trailerReleases: { type: Boolean, default: true },
    favoriteGenreReleases: { type: Boolean, default: true },
    favoriteActorMovies: { type: Boolean, default: true }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
