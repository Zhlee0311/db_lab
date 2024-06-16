module.exports = app => {
  const students = require('../controllers/student.controller.js');

  var router = require("express").Router();

  router.post('/addStudent', students.addStudent);

  router.post('/showStudent', students.showStudent);

  app.use('/api/students', router);

}