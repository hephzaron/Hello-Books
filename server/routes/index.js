const booksController = require('../controllers').books;
const signUpController = require('../controllers').user;
const signInController = require('../controllers').signin;


module.exports = (app) => {
    // Api for users to create account and login to application
    app.post('/api/users/signup', signUpController.create);
    app.post('/api/users/signin', signInController.create);

    //allow users to add new books to the library
    app.post('/api/books', booksController.create);

    // allow users to modify book information
    app.put('/api/books/:bookId', booksController.update);

    // allow users to get all  books in the library
    app.get('/api/books', booksController.list);

    // allow users to borrow book
    app.post('/api/users/:userId/books', booksController.create);

    // enable user to return a book set returned col to true
    app.put('/api/users/:userId/books/:bookId', booksController.update);

    // all users to view unreturned books Add ?returned=false to url
    app.get('/api/users/:userId/books', booksController.retrieve);

    // allow users to view borrowed books
    app.get('/api/users', signUpController.list);
};