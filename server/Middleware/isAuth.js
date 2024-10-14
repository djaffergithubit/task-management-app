const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = isAuth;