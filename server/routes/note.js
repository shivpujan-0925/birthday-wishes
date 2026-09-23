const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { getIsConnected } = require('../config/db');
const inMemoryStore = require('../config/inMemoryStore');

// GET /api/note - Retrieve personal handwritten note
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const note = await Note.findOne();
      if (note) {
        return res.json(note);
      }
    }
    return res.json(inMemoryStore.note);
  } catch (error) {
    return res.json(inMemoryStore.note);
  }
});

module.exports = router;
