const Books = require('../models').Book;
const Authors = require('../models').Author;
const paginate = require('./paginate').paginate;
const returnObject = require('./paginate').returnObject;

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
                available: req.body.quantity,
                documentURL: req.body.documentURL,
                coverPhotoURL: req.body.coverPhotoURL

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
                            available: req.body.available || books.quantity,
                            documentURL: req.body.documentURL || books.documentURL,
                            coverPhotoURL: req.body.coverPhotoURL || books.coverPhotoURL
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

    getBooks(req, res) {
        const { count, page } = req.query;
        const { bookId } = req.params;
        let { limit, offset } = paginate(page, count)
        return Books.findAll({
            where: (
                bookId ? { id: bookId } : {}
            ),
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ],
            include: [{
                model: Authors,
                through: {
                    attributes: ['id', 'fullName', 'dateOfBirth', 'dateOfDeath', 'lifeSpan']
                }
            }]
        }).then((books) => {
            if (!books || books.length === 0) {
                return res.status(200).send({
                    message: 'Oops! No books exists in this section'
                });
            }
            return res.status(200).send(returnObject(books, 'books'))
        }).catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
    },

    delete(req, res) {
        return Books
            .destroy({
                where: { id: req.params.bookId }
            }).then(books => {
                if (!books) {
                    return res.status(404).send({
                        message: 'Book not found'
                    });
                }
                if (books) {
                    return res.status(200).send({
                        message: 'Book have been successfully deleted'
                    });
                }
            })
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    }

};