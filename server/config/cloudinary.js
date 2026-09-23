const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_KEY !== 'demo_key';

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

let upload;
if (isCloudinaryConfigured) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'birthday-tanisha',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
    },
  });
  upload = multer({ storage });
} else {
  // In-memory multer when Cloudinary keys are placeholders
  const storage = multer.memoryStorage();
  upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
}

module.exports = { cloudinary, upload, isCloudinaryConfigured };
