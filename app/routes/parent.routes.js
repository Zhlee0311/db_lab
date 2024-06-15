module.exports = app => {
  const parents = require('../controllers/parent.controller.js');

  var router = require("express").Router();

  router.post('/register', parents.register);

  app.use('/api/parents', router);
}