const databaseUri = process.env.MONGO_URL;
const Db = require('./mongodb');
const dbInstance = new Db();
module.exports = {
  async close() {
    try {
      if (dbInstance) {
        console.log('[MongoDB] Database trying to disconnect');
        await dbInstance.close();
      }
    } catch (e) {
      console.error('Error on close DB: %j', e);
      throw e;
    }
  },
  async connect(uri) {
    const mongoConnectionUri = uri || databaseUri;
    try {
      await dbInstance.connect(mongoConnectionUri);
      console.log('[MongoDB] Database connected');
    } catch (e) {
      console.error('[MongoDB] Database failed to connect - ', e.message);
      throw e;
    }
  },
  getCollection(name) {
    return dbInstance.getCollection(name);
  },
  ObjectId: dbInstance.ObjectId
};
