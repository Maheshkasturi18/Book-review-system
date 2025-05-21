const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const setupSwaggerDocs = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());

setupSwaggerDocs(app);

app.use("/", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/", reviewRoutes);
app.use("/", searchRoutes);
app.get("/test", (req, res) => {
  res.send("Welcome to the Book API");
});

module.exports = app;
