require("dotenv").config();
const pkg = require('./package.json');
const Server = require('./lib/server');
const database = require('./lib/database');

process.title = pkg.name;

const instanceServer = new Server();

const shutdown = async () => {
  console.log('Gracefully shutdown in progress');
  await instanceServer.stop();
  await database.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', (err) => {
    console.error('uncaughtException caught the error: ', err);
    throw err;
  })
  .on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection at: Promise ${promise} reason: ${err}`);
    throw err;
  })
  .on('exit', (code) => {
    console.log(`Node process exit with code: ${code}`);
  });

(async () => {
  try {
    await database.connect();
    await instanceServer.start();
  } catch (err) {
    console.error('[APP] initialization failed', err);
    throw err;
  }
  console.log('[APP] initialized SUCCESSFULLY');
})();
