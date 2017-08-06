const booksController = require('../controllers').books;
const signUpController = require('../controllers').user;
const signInController = require('../controllers').signin;


module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'add books'
    }));
    // create new accounts
    app.post('/api/user/signup', signUpController.create);

    // user login api
    app.post('/api/user/signin', signInController.create);

    //allow users to add new books to the library
    app.post('/api/books', booksController.create);

    // allow users to modify book information
    app.put('/api/books/:id', booksController.update);

    // allow users to get all  books in the library
    app.get('/api/books', booksController.list);

    // allow users to borrow book
    app.post('/api/user/userId/books', booksController.create);

    // enable user to return a book
    app.put('/api/user/:id/books', booksController.create);


};