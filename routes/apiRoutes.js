const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/subs', AppController.getSubscriptions);
  router.post('/newsub', AppController.createSub);
  router.delete('/subs/:id', AppController.deleteSubcription)
  router.get('/subs/:id', ensureAuthenticated, AppController.getOneSub);
  router.put('/subs/:id', ensureAuthenticated, AppController.updateSub);

  return router;
};
