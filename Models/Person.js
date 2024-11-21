import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the person
 *         name:
 *           type: string
 *           description: The name of the person
 *           maxLength: 100
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The birth date of the person
 *         biography:
 *           type: string
 *           description: A brief biography of the person
 *           maxLength: 2000
 *         photo:
 *           type: string
 *           description: URL to the person's photo
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             enum: [Actor, Director, Producer, Writer, Composer, Cinematographer]
 *           description: The roles the person has in the film industry
 *         filmography:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 description: The ObjectId of the movie
 *               role:
 *                 type: string
 *                 description: The role of the person in this movie
 *           description: The movies the person has been involved in
 *         awards:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 200
 *                 description: The name of the award
 *               year:
 *                 type: number
 *                 minimum: 1888
 *                 description: The year the award was received
 *               category:
 *                 type: string
 *                 maxLength: 200
 *                 description: The category of the award
 *           description: Awards received by the person
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the person was added to the database
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the person's information was last updated
 */

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  birthDate: Date,
  biography: {
    type: String,
    maxlength: [2000, 'Biography cannot exceed 2000 characters']
  },
  photo: String,
  roles: [{
    type: String,
    enum: ['Actor', 'Director', 'Producer', 'Writer', 'Composer', 'Cinematographer']
  }],
  filmography: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    role: {
      type: String,
      required: true
    }
  }],
  awards: [{
    name: {
      type: String,
      required: true,
      maxlength: [200, 'Award name cannot exceed 200 characters']
    },
    year: {
      type: Number,
      required: true,
      min: 1888 // First movie was made in 1888
    },
    category: {
      type: String,
      required: true,
      maxlength: [200, 'Award category cannot exceed 200 characters']
    }
  }]
}, {
  timestamps: true
});

personSchema.index({ name: 'text', biography: 'text' });

export default mongoose.model('Person', personSchema);