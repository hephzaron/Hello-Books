// ths add books to the library

const Books = require('../models').Books;

module.exports = {
    create(req, res) {
        return Books
            .create({
                userId: req.params.userId,
                title: req.body.title,
                bookInfo: req.body.bookInfo,
                quantity: req.body.quantity
            })
            .then(books => res.status(201).send(books))
            .catch(err => res.status(400).send(err));
    },
    list(req, res) {
        return Books
            .all()
            .then(books => res.status(200).send(books))
            .catch(err => res.status(400).send(err));
    },
    retrieve(req, res) {
        return Books
            .findById(req.params.id, {
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })
            .then(book => {
                if (!book) {
                    return res.status(404).send({
                        message: 'Book not found'
                    });
                }
                return res.status(200).send(book);
            })
            .catch(error => res.status(400).send(error));
    }

};