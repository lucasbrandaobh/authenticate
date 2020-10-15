const controllers = require('./controllers');
const { isAuthenticated } = require('../authorization/authorization-bearer-strategy');

const usersRoutes = (router) => {
  router.get('/users', isAuthenticated, controllers.get);
  router.post('/users', isAuthenticated, controllers.post);
};

module.exports = usersRoutes;