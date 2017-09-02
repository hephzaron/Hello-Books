// ths add books to the library

const Books = require('../models').Books;

module.exports = {
    create(req, res) {
        return Books
            .create({
                userId: req.params.userId,
                title: req.body.title,
                bookInfo: req.body.bookInfo,
                quantity: req.body.quantity,
                returned: req.body.returned
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
    update(req, res) {
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
                        message: 'Book  Not Found'
                    });
                }
                return books
                    .update({
                        title: req.body.title || books.title,
                        bookInfo: req.body.bookInfo || books.bookInfo,
                        quantity: req.body.quantity || books.quantity,
                        returned: req.body.returned || books.returned
                    })
                    .then(updatedBooks => res.status(200).send(updatedBooks))
                    .catch(err => res.status(400).send(err));
            })
            .catch(err => res.status(400).send(err));
    },
    retrieve(req, res) {
        return Books
            .find({
                where: {
                    userId: req.params.userId,
                    returned: req.query.returned
                }
            }, {
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })

        .then(books => {
                if (!books) {
                    return res.status(404).send({
                        message: 'Book not found'
                    });
                }
                return res.status(200).send(books);
            })
            .catch(err => res.status(400).send(err));
    }
};