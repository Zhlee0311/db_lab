module.exports = app => {
  const publics = require('../controllers/public.controller.js');

  var router = require("express").Router();

  router.post('/userInfo', publics.userInfo);

  app.use('/api/publics', router);
}