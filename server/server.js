require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const verifyViewerJWT = require('./middleware/verifyViewerJWT');

const authRoutes = require('./routes/auth');
const wishesRoutes = require('./routes/wishes');
const noteRoutes = require('./routes/note');
const photosRoutes = require('./routes/photos');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Base API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wishes', verifyViewerJWT, wishesRoutes);
app.use('/api/note', verifyViewerJWT, noteRoutes);
app.use('/api/photos', verifyViewerJWT, photosRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: `Birthday Backend for ${process.env.BIRTHDAY_GIRL_NAME || 'Tanisha'} is running 💖`,
    birthday: `${process.env.BIRTHDAY_DATE}/${process.env.BIRTHDAY_MONTH}`
  });
});

app.listen(PORT, () => {
  console.log(`🎉 Birthday server running on http://localhost:${PORT}`);
});
