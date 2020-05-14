const express = require("express");
const connectDB = require("./config/db");

const app = express();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");

// connect DB

connectDB();

// middleware
app.use(express.json({ extended: false }));

// dont forget to delete it before deploy application
app.get("/", (req, res) => {
  res.send("API Running");
});

// Define API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
