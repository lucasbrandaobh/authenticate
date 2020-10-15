const controllers = require('./controllers');
const { isAuthenticated } = require('../authorization/authorization-bearer-strategy');

const authenticateRoutes = (router) => {
  router.post('/authenticate', isAuthenticated, controllers.post);
};

module.exports = authenticateRoutes;