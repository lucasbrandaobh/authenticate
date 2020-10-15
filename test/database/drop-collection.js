const { getCollection } = require('../../lib/database');

const dropModule = (() => {
  const dropCollections = (collections) => Promise
    .all(collections.map((collection) => getCollection(collection)
      .drop()
      .catch((reason) => {
        console.error('Drop collections error: ', reason);
      })));

  return {
    dropCollections
  };
})();

module.exports = dropModule;
