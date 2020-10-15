const { getCollection } = require('../../database');

const OAUTHTOKENS_COLLECTION_NAME = 'authtokens';
const set = new Set();

const oauthTokensRepository = (() => {
  const findAuthToken = async (filter) => {
    let hasAuthToken = false;
    set.forEach((value) => {
      if (value.token === filter.token) {
        hasAuthToken = value;
      }
    });
    if (hasAuthToken) {
      return hasAuthToken;
    }
    const authtoken = await getCollection(OAUTHTOKENS_COLLECTION_NAME).findOne(filter);
    if (authtoken) {
      set.add(authtoken);
      return authtoken;
    }
    return null;
  };
  const insertOne = (oauthtoken) => getCollection(OAUTHTOKENS_COLLECTION_NAME).insertOne(oauthtoken);
  return {
    findAuthToken,
    insertOne
  };
})();

module.exports = oauthTokensRepository;
