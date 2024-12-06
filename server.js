// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();  // To use environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // For parsing JSON requests

// Import Routes
const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api/devices', deviceRoutes);  // Base route for devices

app.get("/api", (req, res) => {
    res.json({ message: "Hello Darren - this is the backend" })
})

// Connect to MongoDB
const connectDB = require('./config/db');
// TODO add the mongo connection string to the db file then re-instate
// connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
