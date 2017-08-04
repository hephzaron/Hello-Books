// ths add books to the library

const Books = require('../models').Books;

module.exports = {
    create(req, res) {
        return Books
            .create({
                bookId: req.params.bookId,
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
    }
    /*update(req, res) {
        return Books
            .find({
                where: {
                    id: req.params.bookId,
                    userId: req.params.userId
                }
            })
            .then(books => {
                    if (!books) {
                        return res.status(404).send({
                            message: 'Book not found'
                        });
                    }
                    return books
                        .update({
                            content: req.body.content || books.content,
                            complete: req.body.content || books.complete
                        })
                        .then(bookUpdate => res.status(200).send(bookUpdate))
                        .catch(err => res.status(400).send(err));
                }
    }*/
};