const sha256 = require('sha256');
const { findAuthToken } = require('../repository');

const getAuthToken = async (token) => findAuthToken({
  token: sha256(token)
});

module.exports = {
  getAuthToken
};
