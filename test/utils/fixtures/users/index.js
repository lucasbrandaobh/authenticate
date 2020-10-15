const Chance = require('chance');

const chance = new Chance();

module.exports = {
  create: (data = {}) => {
    const user = {};
    user.name = data.descricao || chance.name();
    user.email = data.causaOrigem || chance.email();
    user.pasword = data.pasword || chance.word();
    user.role = data.role || chance.word();
    return user;
  }
};
