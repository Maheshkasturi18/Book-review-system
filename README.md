# 📚 Book Review API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** to allow users to review and explore books. Authentication is handled using **JWT**, and API documentation is provided via **Swagger**.

---

## 🚀 Features

* User Signup & Login (JWT-based authentication)
* Add, retrieve, and filter books
* Submit, update, and delete reviews
* Average rating calculation per book
* Book search by title/author (partial & case-insensitive)
* Swagger API documentation

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JWT (jsonwebtoken)
* **Documentation:** Swagger (swagger-ui-express & swagger-jsdoc)
* **Environment Config:** dotenv

---

## 📁 Project Structure

```
book-review-api/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Book.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── swagger/
│   └── swaggerConfig.js
├── .env
├── app.js
├── package.json
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-api
JWT_SECRET=your_jwt_secret
```

### 4. Run the project

```bash
nodemon server.js
```

### 5. Access Swagger Docs

Visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 📬 Example API Requests

### Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "pass123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "pass123"}'
```

### Add a Book (Auth Required)

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "genre": "Fiction",
        "description": "A journey to find treasure.",
        "publishedYear": 1988
      }'
```

---

## 🗃️ Database Schema (Simplified)

### User

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  description: String,
  publishedYear: Number
}
```

### Review

```js
{
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String
}
```
