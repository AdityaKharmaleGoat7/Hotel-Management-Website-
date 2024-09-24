const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Register route
router.post('/register', async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: new User().hashPassword(req.body.password),
  });
  await newUser.save();
  res.redirect('/login');
});

module.exports = router;
