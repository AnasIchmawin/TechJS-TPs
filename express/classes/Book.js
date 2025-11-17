// Book class module as required by the TP
class Book {
  constructor(title, author, numberOfPages, status, price, format, suggestedBy = '') {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.price = price;
    this.numberOfPagesRead = 0;
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = false;
  }

  /**
   * Returns the current reading progress (number of pages read)
   * @returns {number} Number of pages currently read
   */
  currentlyAt() {
    return this.numberOfPagesRead;
  }

  /**
   * Sets the number of pages read and updates finished status
   * @param {number} pagesRead - Number of pages read
   */
  setCurrentlyAt(pagesRead) {
    if (pagesRead < 0) {
      throw new Error('Pages read cannot be negative');
    }
    
    if (pagesRead > this.numberOfPages) {
      pagesRead = this.numberOfPages;
    }
    
    this.numberOfPagesRead = pagesRead;
    
    // Automatically update finished status when pages read equals total pages
    if (this.numberOfPagesRead >= this.numberOfPages && this.numberOfPages > 0) {
      this.finished = true;
      this.status = 'Read';
    } else {
      this.finished = false;
      if (this.numberOfPagesRead > 0 && this.status === 'Unread') {
        this.status = 'Currently reading';
      }
    }
  }

  /**
   * Gets the reading percentage
   * @returns {number} Reading percentage (0-100)
   */
  getReadingPercentage() {
    if (this.numberOfPages === 0) return 0;
    return Math.round((this.numberOfPagesRead / this.numberOfPages) * 100);
  }

  /**
   * Deletes the book (placeholder method)
   * In a real application, this would interact with the database
   */
  deleteBook() {
    // This method would typically handle database deletion
    // For now, it's a placeholder as required by the TP
    console.log(`Book "${this.title}" marked for deletion`);
    return true;
  }

  /**
   * Converts the book instance to a plain object
   * @returns {Object} Book data as plain object
   */
  toObject() {
    return {
      title: this.title,
      author: this.author,
      numberOfPages: this.numberOfPages,
      numberOfPagesRead: this.numberOfPagesRead,
      status: this.status,
      price: this.price,
      format: this.format,
      suggestedBy: this.suggestedBy,
      finished: this.finished,
      readingPercentage: this.getReadingPercentage()
    };
  }

  /**
   * Creates a Book instance from a plain object (e.g., from database)
   * @param {Object} data - Book data object
   * @returns {Book} New Book instance
   */
  static fromObject(data) {
    const book = new Book(
      data.title,
      data.author,
      data.numberOfPages,
      data.status,
      data.price,
      data.format,
      data.suggestedBy
    );
    
    book.setCurrentlyAt(data.numberOfPagesRead || 0);
    return book;
  }

  /**
   * Validates book data
   * @returns {Object} Validation result with isValid and errors
   */
  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim() === '') {
      errors.push('Title is required');
    }
    
    if (!this.author || this.author.trim() === '') {
      errors.push('Author is required');
    }
    
    if (this.numberOfPages < 0) {
      errors.push('Number of pages cannot be negative');
    }
    
    if (this.price < 0) {
      errors.push('Price cannot be negative');
    }
    
    const validStatuses = ['Read', 'Re-read', 'DNF', 'Currently reading', 'Returned', 'Unread', 'Want to read'];
    if (!validStatuses.includes(this.status)) {
      errors.push('Invalid status');
    }
    
    const validFormats = ['Print', 'PDF', 'EBook', 'AudioBook'];
    if (!validFormats.includes(this.format)) {
      errors.push('Invalid format');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

module.exports = Book;