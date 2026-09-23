const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
  public_id: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);
