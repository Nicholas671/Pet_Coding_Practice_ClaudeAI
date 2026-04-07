const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const authRoutes = require("./routes/auth");
const characterRoutes = require("./routes/characters");

const app = express();

// Allow requests from the frontend — localhost in dev, Render URL in production
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(express.json());

// Log every incoming request so we can see what the server receives
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
