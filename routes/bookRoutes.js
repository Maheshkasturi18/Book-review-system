const express = require("express");
const auth = require("../middlewares/auth");
const {
  createBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/", auth, createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books (with optional filters)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of books
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book details by ID including average rating and reviews
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for reviews
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of reviews per page
 *     responses:
 *       200:
 *         description: Book details with reviews
 *       404:
 *         description: Book not found
 */
