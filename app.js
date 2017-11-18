const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const credentials = require('./credentials');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
/*const session = require('express-session');
const cookieSession = require('cookie-session');*/

// Set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));
app.disable('x-powered-by');
app.use(cookieParser(credentials.secret));
//app.use(session({secret:credentials.cookieSecret}));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: credentials.secret, resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// require routes into hello-books application

require('./server/routes')(app, passport); // load  routes and pass in our app and fully configured passport
require('./server/oauth-login/config/passport')(passport);

module.exports = app;