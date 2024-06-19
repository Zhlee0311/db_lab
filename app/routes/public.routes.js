module.exports = app => {
  const publics = require('../controllers/public.controller.js');

  var router = require("express").Router();

  router.get('/userInfo', publics.userInfo);

  app.use('/api/publics', router);
}