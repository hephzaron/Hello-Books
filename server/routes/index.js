const booksController = require('..../controllers').books;
const signUpController = require('..../controllers').user;
<<<<<<< HEAD
const signInController = require('..../controllers').user();
=======
const signInController
>>>>>>> create-controllers

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'add books'
    }));

    app.post('/api/books', booksController.create);
    app.put('/api/books/bookId', booksController.update);
    app.get('/api/books', booksController.list);
    app.post('/api/books/:bookId/list', booksController.create);
    app.post('/api/users/signup', signUpController.create);
<<<<<<< HEAD
    app.post('/api/users/signup', signInController.create);
=======
    app.post('/api/users/signup', signUPController.create);
>>>>>>> create-controllers
};