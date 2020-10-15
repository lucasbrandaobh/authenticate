const mongo = require('mongodb').MongoClient;

const dropModule = (() => {
  const dropDatabase = async () => {
    const client = await mongo.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.db().dropDatabase();
    await client.close();
  };

  return {
    dropDatabase
  };
})();

module.exports = dropModule;
