// create schema and model for Book
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  author: { 
    type: String, 
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters']
  },
  numberOfPages: { 
    type: Number, 
    required: [true, 'Number of pages is required'],
    min: [0, 'Number of pages cannot be negative'],
    default: 0 
  },
  numberOfPagesRead: { 
    type: Number, 
    default: 0,
    min: [0, 'Pages read cannot be negative']
  },
  status: { 
    type: String, 
    enum: {
      values: ['Read', 'Re-read', 'DNF', 'Currently reading', 'Returned', 'Unread', 'Want to read'],
      message: 'Status must be one of: Read, Re-read, DNF, Currently reading, Returned, Unread, Want to read'
    },
    default: 'Unread'
  },
  price: { 
    type: Number, 
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  format: { 
    type: String, 
    enum: {
      values: ['Print', 'PDF', 'EBook', 'AudioBook'],
      message: 'Format must be one of: Print, PDF, EBook, AudioBook'
    },
    default: 'Print'
  },
  finished: { type: Boolean, default: false },
  suggestedBy: {
    type: String,
    trim: true,
    maxlength: [100, 'Suggested by cannot be more than 100 characters']
  },
  year: { 
    type: Number,
    min: [1000, 'Year must be valid'],
    max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future']
  },
  genre: { 
    type: String,
    trim: true,
    maxlength: [50, 'Genre cannot be more than 50 characters']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  publishedDate: { type: Date },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Pre-save middleware to validate numberOfPagesRead
bookSchema.pre('save', function(next) {
  if (this.numberOfPagesRead > this.numberOfPages) {
    this.numberOfPagesRead = this.numberOfPages;
  }
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;