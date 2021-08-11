const connectToDB = require('./db/db.client');
const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./utils/logger');
const { exit } = process;

process
  .on('uncaughtException', (err, origin) => {
    logger.log(
      'error',
      `Caught exception: ${err}. Exception origin: ${origin}`
    );
    exit(1);
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.log(
      'error',
      `Unhandled Rejection at: ${promise}. Reason: ${reason}`
    );
    exit(1);
  });

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
