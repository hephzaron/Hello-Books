const booksController = require('..../controllers').books;

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'add books'
    }));

    app.post('/api/books', booksController.create);
};