const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const session = require('express-session');
const socketio = require('socket.io');
const chat = require("./chat");

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true
}));

// SOCKET.IO
const http = require('http').Server(app);
const io = socketio(http, {
	connectionStateRecovery: {
	  // the backup duration of the sessions and the packets
	  maxDisconnectionDuration: 2 * 60 * 1000,
	  // whether to skip middlewares upon successful recovery
	  skipMiddlewares: true,
	}
  });
chat(io);



app.use('/api/users', require('./routes/api/users'));
app.use('/api/chat', require('./routes/api/chat'));

const port = process.env.PORT || 3001;

http.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});