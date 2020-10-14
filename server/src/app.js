const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors');
const strava = require('./clients/strava');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  credentials: true,
  origin: [process.env.ALLOWED_DOMAIN]
}));

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}));

// Routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/oauth_callback', require('./routes/oauth-callback'));

app.listen(process.env.SERVER_PORT || 9001);