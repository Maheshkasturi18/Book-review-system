const express = require('express');
const { searchBooks } = require('../controllers/searchController');

const router = express.Router();

router.get('/search', searchBooks);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search books by title or author
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search books by title or author (case-insensitive, partial match)
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Matching books
 *       400:
 *         description: Missing query parameter
 */
