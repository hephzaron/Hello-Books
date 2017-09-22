const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
//const expressJWT = require('express-jwt');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*app.use(expressJWT({ secret: 'i love programming' }).unless({
    path: ['/api/users/signin', '/api/genre', '/api/authors',
        '/api/users/books', '/api/books', '/api/owner', '/api/genre/books',
        '/api/books/author', '/api/owner/book'
    ]
}));*/

// require routes into hello-books application

require('./server/routes')(app);
/*app.get('*', (req, res) => res.status(200).send({
    message: ('Hello Books!')
}));*/

module.exports = app;