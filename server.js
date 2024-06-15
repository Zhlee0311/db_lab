const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors({
  origin: (
    requestOrigin,
    callback,
  ) => {
    callback(null, requestOrigin)
  }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route for testing,runs "hello,js" on the root URL
app.get('/', (req, res) => {
  res.send("hello,js");
})

// routes
require('./app/routes/parent.routes.js')(app);
require('./app/routes/teacher.routes.js')(app);
require('./app/routes/class.routes.js')(app);
require('./app/routes/student.routes.js')(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});