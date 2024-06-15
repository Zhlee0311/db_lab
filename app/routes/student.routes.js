module.exports=app=>{
  const students=require('../controllers/student.controller.js');

  var router=require("express").Router();

  router.post('/addStudent',students.addStudent);

  app.use('/api/students',router);

}