const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const credentials = require('./credentials');
const cookieParser = require('cookie-parser');
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


// require routes into hello-books application

require('./server/routes')(app);
/*app.get('*', (req, res) => res.status(200).send({
    message: ('Hello Books!')
}));*/

module.exports = app;