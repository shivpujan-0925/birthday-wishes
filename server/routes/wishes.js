const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { getIsConnected } = require('../config/db');
const inMemoryStore = require('../config/inMemoryStore');

// GET /api/wishes - Retrieve all birthday wishes
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const wishes = await Wish.find().sort({ createdAt: -1 });
      if (wishes && wishes.length > 0) {
        return res.json(wishes);
      }
    }
    return res.json(inMemoryStore.wishes);
  } catch (error) {
    return res.json(inMemoryStore.wishes);
  }
});

module.exports = router;
