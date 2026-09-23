const jwt = require('jsonwebtoken');

const verifyAdminJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Admin authentication required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET || 'super_secret_admin_owner_key_2026');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Admin privileges required.' });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Admin session expired or invalid. Please log in again.' });
  }
};

module.exports = verifyAdminJWT;
