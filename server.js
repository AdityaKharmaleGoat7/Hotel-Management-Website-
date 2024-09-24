// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');

// Create Express App
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Session Middleware
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware for Authentication
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hotel-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);

// Server Listen on Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
