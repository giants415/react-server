// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Set up (2nd auth, after /, creates a new DB inside of mongo. I could name it w/e I want)
mongoose.connect('mongodb://localhost:27017/auth');

// App Set Up
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Set Up
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
