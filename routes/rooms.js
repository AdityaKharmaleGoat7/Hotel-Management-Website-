const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all available rooms
router.get('/available', async (req, res) => {
  const rooms = await Room.find({ status: false });
  res.json(rooms);
});

// Book a room
router.post('/book/:roomNumber', async (req, res) => {
  const room = await Room.findOne({ roomNumber: req.params.roomNumber });
  if (!room || room.status) {
    return res.status(404).json({ message: 'Room not available or already booked' });
  }

  // Update room status to booked
  room.status = true;
  room.customer = req.body.customer; // Customer details from form
  await room.save();
  res.json({ message: 'Room booked successfully' });
});

module.exports = router;
