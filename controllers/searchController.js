const Book = require('../models/Book');

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive partial match

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });

    res.json({ total: books.length, results: books });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
