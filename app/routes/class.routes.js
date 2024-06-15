module.exports = app => {
  const classes = require('../controllers/class.controller.js');

  var router = require("express").Router();

  router.post('/addClass', classes.addClass);

  app.use('/api/classes', router);

}