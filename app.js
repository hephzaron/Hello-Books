const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const credentials = require('./credentials.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
app.disable('x-powered-by');
app.use(cookieParser(credentials.secret));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: credentials.secret,
    resave: true,
    saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./server/routes')(app, passport);
require('./server/oauth-login/config/passport')(passport);

// send reminder mail for unreturned books
require('./server/email/notifyUser').sendReminder();

module.exports = app;