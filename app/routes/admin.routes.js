module.exports = app => {
  const admins = require('../controllers/admin.controller.js');

  var router = require('express').Router();

  router.post('/login', admins.login);

  app.use('/api/admins', router);
}