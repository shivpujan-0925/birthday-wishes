const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyAdminJWT = require('../middleware/verifyAdminJWT');
const { upload, cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const Photo = require('../models/Photo');
const Wish = require('../models/Wish');
const Note = require('../models/Note');
const { getIsConnected } = require('../config/db');
const inMemoryStore = require('../config/inMemoryStore');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'tanisha2026';

  if (username === validUser && password === validPass) {
    const token = jwt.sign(
      { role: 'admin', username },
      process.env.ADMIN_JWT_SECRET || 'super_secret_admin_owner_key_2026',
      { expiresIn: '30d' }
    );
    return res.json({ success: true, message: 'Admin logged in successfully', token });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
});

// All subsequent routes require Admin JWT
router.use(verifyAdminJWT);

// POST /api/admin/photos - Upload photo or add image URL
router.post('/photos', upload.single('image'), async (req, res) => {
  try {
    const { caption, order, imageUrl } = req.body;
    let finalUrl = imageUrl;
    let public_id = '';

    if (req.file) {
      if (isCloudinaryConfigured && req.file.path) {
        finalUrl = req.file.path;
        public_id = req.file.filename || '';
      } else {
        // Fallback Base64 URL for local testing without Cloudinary keys
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        finalUrl = `data:${req.file.mimetype};base64,${b64}`;
        public_id = 'local_' + Date.now();
      }
    }

    if (!finalUrl) {
      return res.status(400).json({ message: 'An image file or Image URL is required.' });
    }

    const photoData = {
      url: finalUrl,
      caption: caption || '',
      order: Number(order) || (inMemoryStore.photos.length + 1),
      public_id
    };

    if (getIsConnected()) {
      const newPhoto = await Photo.create(photoData);
      return res.status(201).json(newPhoto);
    }

    // In-memory fallback
    const mockPhoto = { ...photoData, _id: 'photo_' + Date.now(), createdAt: new Date().toISOString() };
    inMemoryStore.photos.push(mockPhoto);
    return res.status(201).json(mockPhoto);
  } catch (error) {
    console.error('Error uploading photo:', error);
    return res.status(500).json({ message: 'Failed to upload photo.', error: error.message });
  }
});

// PUT /api/admin/photos/:id - Update photo caption/order
router.put('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, order } = req.body;

    if (getIsConnected()) {
      const updated = await Photo.findByIdAndUpdate(id, { caption, order: Number(order) }, { new: true });
      return res.json(updated);
    }

    const index = inMemoryStore.photos.findIndex(p => String(p._id) === String(id));
    if (index !== -1) {
      if (caption !== undefined) inMemoryStore.photos[index].caption = caption;
      if (order !== undefined) inMemoryStore.photos[index].order = Number(order);
      return res.json(inMemoryStore.photos[index]);
    }
    return res.status(404).json({ message: 'Photo not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update photo.' });
  }
});

// DELETE /api/admin/photos/:id - Delete photo
router.delete('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const photo = await Photo.findById(id);
      if (photo && photo.public_id && isCloudinaryConfigured) {
        try {
          await cloudinary.uploader.destroy(photo.public_id);
        } catch (e) {
          console.warn('Cloudinary delete warning:', e.message);
        }
      }
      await Photo.findByIdAndDelete(id);
      return res.json({ message: 'Photo deleted successfully.' });
    }

    inMemoryStore.photos = inMemoryStore.photos.filter(p => String(p._id) !== String(id));
    return res.json({ message: 'Photo deleted from memory.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete photo.' });
  }
});

// POST /api/admin/wishes - Add new wish
router.post('/wishes', async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text) return res.status(400).json({ message: 'Wish text is required.' });

    const wishData = { text, author: author || 'Well-wisher' };

    if (getIsConnected()) {
      const newWish = await Wish.create(wishData);
      return res.status(201).json(newWish);
    }

    const mockWish = { ...wishData, _id: 'wish_' + Date.now(), createdAt: new Date().toISOString() };
    inMemoryStore.wishes.unshift(mockWish);
    return res.status(201).json(mockWish);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add wish.' });
  }
});

// DELETE /api/admin/wishes/:id - Delete wish
router.delete('/wishes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Wish.findByIdAndDelete(id);
      return res.json({ message: 'Wish deleted.' });
    }
    inMemoryStore.wishes = inMemoryStore.wishes.filter(w => String(w._id) !== String(id));
    return res.json({ message: 'Wish deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete wish.' });
  }
});

// PUT /api/admin/note - Update handwritten note
router.put('/note', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Note text cannot be empty.' });

    if (getIsConnected()) {
      let note = await Note.findOne();
      if (note) {
        note.text = text;
        note.updatedAt = Date.now();
        await note.save();
      } else {
        note = await Note.create({ text });
      }
      return res.json(note);
    }

    inMemoryStore.note = { _id: 'note_1', text, updatedAt: new Date().toISOString() };
    return res.json(inMemoryStore.note);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update note.' });
  }
});

module.exports = router;
