const { isAuthenticated, init } = require('./authorization-bearer-strategy');

module.exports = {
  init,
  isAuthenticated
};
