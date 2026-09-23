const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/verify - Validate birth date & month
router.post('/verify', (req, res) => {
  const { date, month } = req.body;

  if (!date || !month) {
    return res.status(400).json({ message: 'Both date and month are required.' });
  }

  // Normalize numbers e.g. "9" -> "09", "25" -> "25"
  const cleanDate = String(date).trim().padStart(2, '0');
  const cleanMonth = String(month).trim().padStart(2, '0');

  const expectedDate = String(process.env.BIRTHDAY_DATE || '25').trim().padStart(2, '0');
  const expectedMonth = String(process.env.BIRTHDAY_MONTH || '09').trim().padStart(2, '0');

  if (cleanDate === expectedDate && cleanMonth === expectedMonth) {
    const token = jwt.sign(
      { role: 'viewer', unlockedAt: new Date().toISOString() },
      process.env.JWT_SECRET || 'super_secret_viewer_birthday_key_2026',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Happy Birthday! 🎉 Unlocked successfully.',
      token,
      name: process.env.BIRTHDAY_GIRL_NAME || 'Tanisha'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Oops! That date does not match the birthday girl\'s special day. Hint: Check date & month! 🎈'
  });
});

module.exports = router;
