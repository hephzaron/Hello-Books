const booksController = require('..../controllers').books;
const signUPController = require('..../controllers').user;

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'add books'
    }));

    app.post('/api/books', booksController.create);
    app.put('/api/books/bookId', booksController.update);
    app.get('/api/books', booksController.list);
    app.post('/api/books/:bookId/list', booksController.create);
    app.post('/api/users/signup', signUPController.create);
};