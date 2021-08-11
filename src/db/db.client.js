const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    console.log('*** MongoDB got connected ***');
    // connection.db.dropDatabase(
    //   console.log(`${connection.db.databaseName} database dropped.`)
    // );
    console.log(`Our Current Database Name : ${connection.db.databaseName}`);
    cb();
  });
};

module.exports = connectToDB;
