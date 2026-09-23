const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);
