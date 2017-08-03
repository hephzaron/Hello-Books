// ths add books to the library

const Books = require('.../models').Books;

module.exports = {
    create(req, res) {
        return Books
            .create({
                title: req.body.title,
                bookInfo: req.body.bookInfo,
                quantity: req.body.quantity
            })
            .then(books => res.status(201).send(books))
            .catch(err => res.status(400).send(err));
    }
};