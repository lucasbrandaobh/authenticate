const { getCollection } = require('../database');

const COLLECTION_NAME = 'users';

const usersRepository = (() => {
  const find = (filter = {}, options = {}) => getCollection(COLLECTION_NAME).find(filter, options);
  const findOne = (filter = {}, options = {}) => getCollection(COLLECTION_NAME).findOne(filter, options);
  const insertOne = (user) => getCollection(COLLECTION_NAME).insertOne(user);
  
  return {
    find,
    findOne,
    insertOne
  };
})();

module.exports = usersRepository;
