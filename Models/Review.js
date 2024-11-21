
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  content: {
    type: String,
    required: [true, 'Review content is required'],
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [5000, 'Review cannot exceed 5000 characters']
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  isHighlighted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);