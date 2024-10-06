const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part of "Bearer <token>"

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId; // Attach the userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
