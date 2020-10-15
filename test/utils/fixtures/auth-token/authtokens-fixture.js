const Chance = require('chance');

const chance = new Chance();
const sha256 = require('sha256');

const create = (data = {}) => {
  const body = {};
  body.clientId = data.clientId || chance.word();
  body.userId = data.userId || chance.word();
  if (data.token) {
    body.token = sha256(data.token);
  } else {
    body.token = chance.word();
  }
  return body;
};

module.exports = {
  create
};
