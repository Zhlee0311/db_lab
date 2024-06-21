const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const tokenDecode = require('./app/public/decode.js').tokenDecode;

const app = express();

function verifyToken(req, res, next) {
  if (req.path == '/api/parents/login' || req.path == '/api/teachers/login' || req.path == '/api/admins/login'
    || req.path == '/api/parents/register' || req.path == '/api/teachers/register') {
    return next();
  }
  const token = req.headers['token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const decoded = tokenDecode(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  else {
    req.user = decoded;
    next();
  }
}

app.use(cors({
  origin: (
    requestOrigin,
    callback,
  ) => {
    callback(null, requestOrigin)
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(verifyToken);

// simple route for testing,runs "hello,js" on the root URL
app.get('/', (req, res) => {
  res.send("hello,js");
})

// routes
require('./app/routes/parent.routes.js')(app);
require('./app/routes/teacher.routes.js')(app);
require('./app/routes/class.routes.js')(app);
require('./app/routes/student.routes.js')(app);
require('./app/routes/admin.routes.js')(app);
require('./app/routes/post.routes.js')(app);
require('./app/routes/public.routes.js')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});