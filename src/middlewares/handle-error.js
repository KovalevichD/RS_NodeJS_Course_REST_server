const logger = require('../utils/logger');

const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  logger.log('error', `${statusCode} ${message}`);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
  next();
};

module.exports = handleError;
