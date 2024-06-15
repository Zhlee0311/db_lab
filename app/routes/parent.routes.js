module.exports = app => {
  const parents = require('../controllers/parent.controller.js');

  var router = require("express").Router();

  router.post('/register', parents.register);
  
  router.post('/login', parents.login);

  app.use('/api/parents', router);
}