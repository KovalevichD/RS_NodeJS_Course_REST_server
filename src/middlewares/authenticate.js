const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { FORBIDDEN, UNAUTHORIZED, getStatusText } = require('http-status-codes');

const authenticateJWT = (req, res, next) => {
  if (
    req.originalUrl === '/' ||
    req.originalUrl.startsWith('/login') ||
    req.originalUrl.startsWith('/doc')
  ) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        return res.sendStatus(FORBIDDEN).send(getStatusText(FORBIDDEN));
      }
      next();
    });
  } else {
    res.redirect(UNAUTHORIZED, '/login');
  }
};

module.exports = authenticateJWT;
