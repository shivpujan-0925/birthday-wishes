const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Well-wisher' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
