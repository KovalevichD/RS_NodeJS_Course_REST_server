const { createLogger, transports, format } = require('winston');

const options = {
  info: {
    level: 'info',
    filename: `${__dirname}/../../logs/info.log`,
    format: format.combine(format.uncolorize(), format.json()),
    maxsize: 5242880,
    maxFiles: 5
  },
  error: {
    level: 'error',
    filename: `${__dirname}/../../logs/error.log`,
    format: format.combine(format.uncolorize(), format.json()),
    maxsize: 5242880,
    maxFiles: 5
  }
};

const logger = createLogger({
  level: 'debug',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File(options.info),
    new transports.File(options.error)
  ]
});

module.exports = logger;
