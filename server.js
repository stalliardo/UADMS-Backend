// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();  // To use environment variables
const firebaseAdmin = require('firebase-admin');


// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-admin-sdk.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // For parsing JSON requests

// Import Routes
const deviceRoutes = require('./routes/deviceRoutes');
const userRoutes = require('./routes/userRoutes');

app.get("/api", (req, res) => {
  res.json({ message: "Hello Darren - this is the backend" })
})

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.body.token;
  console.log('request path = ', req.originalUrl);
  
  if(req.originalUrl === "/api/users/register") {
    // Token not required for registration? or is it?
    return next();
  }
  
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach user data to the request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.use('/api/devices', deviceRoutes);  // Base route for devices
app.use('/api/users', verifyFirebaseToken, userRoutes);  // Base route for devices

// Connect to MongoDB
const connectDB = require('./config/db');
// TODO add the mongo connection string to the db file then re-instate
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
