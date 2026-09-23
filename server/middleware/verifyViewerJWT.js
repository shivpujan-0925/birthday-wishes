const jwt = require('jsonwebtoken');

const verifyViewerJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required. Please unlock with birth date and month.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_viewer_birthday_key_2026');
    if (decoded.role !== 'viewer' && decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Invalid access permissions.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Session expired or invalid token. Please unlock again.' });
  }
};

module.exports = verifyViewerJWT;
