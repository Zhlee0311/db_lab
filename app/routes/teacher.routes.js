module.exports = app => {
  const teachers = require('../controllers/teacher.controller.js');

  var router = require('express').Router();

  router.post('/register', teachers.register);

  router.post('/login', teachers.login);

  app.use('/api/teachers', router);
}