const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport.js');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();


//setup middlewares
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

//setup routes
require('./routes')(app);

// When in production, server up production assets from client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

// When in production, if a route isn't recognized serve index.html.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//When in production use the port Heroku specifies / When in dev use 5000. 
app.listen(process.env.PORT || 5000);