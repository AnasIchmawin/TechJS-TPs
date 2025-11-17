// create app 
const express = require("express");
const router = express.Router();
const BookModel = require("./models/book");
const BookClass = require("./classes/Book");

// Get all books from database - render Pug template with reading tracker functionality
router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    
    // Add computed properties for each book
    const booksWithStats = books.map(book => ({
      ...book.toObject(),
      readingPercentage: book.numberOfPages > 0 ? Math.round((book.numberOfPagesRead / book.numberOfPages) * 100) : 0
    }));
    
    // Calculate statistics for reading tracker
    const totalBooks = books.length;
    const booksRead = books.filter(b => b.finished || b.status === 'Read').length;
    const totalPages = books.reduce((sum, book) => sum + (book.numberOfPages || 0), 0);
    const totalPagesRead = books.reduce((sum, book) => sum + (book.numberOfPagesRead || 0), 0);
    const currentlyReading = booksWithStats.filter(b => b.status === 'Currently reading');
    
    const stats = {
      totalBooks,
      booksRead,
      totalPages,
      totalPagesRead,
      percentageComplete: totalPages > 0 ? Math.round((totalPagesRead / totalPages) * 100) : 0
    };
    
    res.render("books", { 
      books: booksWithStats, 
      currentlyReading: currentlyReading,
      stats: stats,
      user: req.user 
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.render("books", { 
      books: [], 
      currentlyReading: [],
      stats: { totalBooks: 0, booksRead: 0, totalPages: 0, totalPagesRead: 0, percentageComplete: 0 },
      user: req.user 
    });
  }
});



// API endpoint to get all books (JSON)
router.get("/api/books", async (req, res) => {
  try {
    const books = await BookModel.find();
    const booksWithStats = books.map(book => ({
      ...book.toObject(),
      readingPercentage: book.numberOfPages > 0 ? Math.round((book.numberOfPagesRead / book.numberOfPages) * 100) : 0
    }));
    res.json(booksWithStats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// API endpoint to add a new book
router.post("/api/books", async (req, res) => {
  try {
    const { title, author, numberOfPages, status, format, price, suggestedBy } = req.body;
    
    // Validation
    if (!title || !author || !numberOfPages) {
      return res.status(400).json({ message: "Title, author, and number of pages are required" });
    }
    
    // Create instance of Book class for validation
    const bookInstance = new BookClass(title, author, parseInt(numberOfPages) || 0, status || 'Unread', parseFloat(price) || 0, format || 'Print', suggestedBy || '');
    const validation = bookInstance.validate();
    
    if (!validation.isValid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors });
    }
    
    const newBook = new BookModel({ 
      title, 
      author, 
      numberOfPages: parseInt(numberOfPages) || 0,
      numberOfPagesRead: 0,
      status: status || 'Unread',
      format: format || 'Print',
      price: parseFloat(price) || 0,
      suggestedBy: suggestedBy || '',
      finished: false
    });
    
    await newBook.save();
    
    // Return book with computed properties
    const bookWithStats = {
      ...newBook.toObject(),
      readingPercentage: 0
    };
    
    res.status(201).json(bookWithStats);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error: error.message });
  }
});

// API endpoint to update reading progress
router.put("/api/books/:id/progress", async (req, res) => {
  try {
    const { numberOfPagesRead } = req.body;
    const book = await BookModel.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    const pagesRead = parseInt(numberOfPagesRead) || 0;
    
    // Validate pages read
    if (pagesRead < 0) {
      return res.status(400).json({ message: "Pages read cannot be negative" });
    }
    
    if (pagesRead > book.numberOfPages) {
      return res.status(400).json({ message: "Pages read cannot exceed total pages" });
    }
    
    book.numberOfPagesRead = pagesRead;
    
    // Update status based on progress
    if (pagesRead >= book.numberOfPages && book.numberOfPages > 0) {
      book.finished = true;
      book.status = 'Read';
      book.numberOfPagesRead = book.numberOfPages;
    } else if (pagesRead > 0) {
      book.status = 'Currently reading';
      book.finished = false;
    } else {
      book.status = 'Unread';
      book.finished = false;
    }
    
    await book.save();
    
    // Return book with computed properties
    const bookWithStats = {
      ...book.toObject(),
      readingPercentage: book.numberOfPages > 0 ? Math.round((book.numberOfPagesRead / book.numberOfPages) * 100) : 0
    };
    
    res.json(bookWithStats);
  } catch (error) {
    res.status(400).json({ message: "Error updating progress", error: error.message });
  }
});

// API endpoint to delete a book
router.delete("/api/books/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting book", error: error.message });
  }
});

module.exports = router;