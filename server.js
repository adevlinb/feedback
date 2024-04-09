const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const session = require('express-session');

require('dotenv').config();
require('./config/database');



app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const http = require('http').Server(app);

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 3001;

http.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});