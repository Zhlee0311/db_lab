module.exports = app => {
  const parents = require("../controllers/parent.controller.js");

  var router = require("express").Router();

  router.post('/', parents.register);

  app.use('/api/parents', router);
  

}