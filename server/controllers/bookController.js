const Books = require('../models').Book;
const Authors = require('../models').Author;


module.exports = {
    // add book to library
    create(req, res) {
        return Books
            .create({
                title: req.body.title,
                genre_id: req.body.genre_id,
                description: req.body.description,
                ISBN: req.body.ISBN,
                quantity: req.body.quantity,
                available: req.body.quantity

            })
            .then(book => res.status(201).send({
                message: `${book.title} have been added to library`,
                book
            }))
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    },
    //allow users to modify book information
    update(req, res) {
        try {
            return Books
                .find({
                    where: {
                        id: req.params.bookId
                    }
                })
                .then(books => {
                    if (!books) {
                        res.status(404).send({
                            message: 'Book Not Found'
                        });
                    }
                    return books.update({
                            title: req.body.title || books.title,
                            genre_id: req.body.genre_id || books.genre_id,
                            description: req.body.description || books.description,
                            ISBN: req.body.ISBN || books.ISBN,
                            quantity: req.body.quantity || books.quantity,
                            available: req.body.available || books.quantity
                        })
                        .then(updatedBook => res.status(200).send({
                            message: `${updatedBook.title} record have been updated`,
                            updatedBook
                        }));
                });
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },

    list(req, res) {
        return Books
            .findAll({
                attributes: ['id', 'title', 'ISBN', 'description'],
                include: [{
                    model: Authors,
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(books => res.status(200).send({ books }))
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    },
    delete(req, res) {
        return Books
            .destroy({
                where: { id: req.params.bookId }
            }).then(books => {
                if (!books) {
                    res.status(404).send({
                        message: 'Book not found'
                    });
                }
                if (books) {
                    res.status(200).send({
                        message: 'Book have been successfully deleted'
                    });
                }
            })
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    }

};