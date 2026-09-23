const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const { getIsConnected } = require('../config/db');
const inMemoryStore = require('../config/inMemoryStore');

// GET /api/photos - Retrieve all photo memories
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const photos = await Photo.find().sort({ order: 1, createdAt: 1 });
      if (photos && photos.length > 0) {
        return res.json(photos);
      }
    }
    return res.json(inMemoryStore.photos);
  } catch (error) {
    return res.json(inMemoryStore.photos);
  }
});

module.exports = router;
