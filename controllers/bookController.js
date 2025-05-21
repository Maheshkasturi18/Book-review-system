const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      createdBy: req.user.id,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all books with pagination and optional filters
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);
    res.json({ total, page: +page, books });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get book by ID with average rating and paginated reviews
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });

    const reviews = await Review.find({ book: id })
      .populate('user', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ book: id });

    const avgRatingAgg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' } } },
    ]);

    const averageRating = avgRatingAgg[0]?.avgRating || 0;

    res.json({
      book,
      averageRating: averageRating.toFixed(2),
      reviews: {
        total: totalReviews,
        page: +page,
        data: reviews,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
