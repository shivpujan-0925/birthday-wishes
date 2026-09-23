const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('ℹ️ MONGODB_URI not provided. Server will run with in-memory resilient fallback.');
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection skipped or failed (${error.message}). In-memory store active.`);
    isConnected = false;
  }
};

module.exports = { connectDB, getIsConnected: () => isConnected };
