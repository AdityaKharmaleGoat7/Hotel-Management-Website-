const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, unique: true },
  type: { type: String, required: true },  // AC/Non-AC
  comfort: { type: String, required: true }, // S/N
  size: { type: String, required: true }, // B/S
  rent: { type: Number, required: true },
  status: { type: Boolean, default: false }, // 0 = available, 1 = booked
  customer: {
    name: String,
    address: String,
    phone: String,
    from_date: String,
    to_date: String,
    payment_advance: Number,
  },
});

module.exports = mongoose.model('Room', roomSchema);
