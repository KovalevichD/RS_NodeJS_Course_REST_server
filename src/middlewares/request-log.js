const logger = require('../utils/logger');

const requestLog = (req, res, next) => {
  const { method, url, params, body } = req;
  logger.log(
    'info',
    `${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(body)}`
  );
  next();
};

module.exports = requestLog;
