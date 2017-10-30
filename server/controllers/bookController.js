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
            .then(books => res.status(201).send(books))
            .catch(err => res.status(400).send(err));
    },
    //allow users to modify book information
    update(req, res) {
        return Books
            .find({
                where: {
                    id: req.params.bookId
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
                        genre_id: req.body.genre_id || books.genre_id,
                        description: req.body.description || books.description,
                        ISBN: req.body.ISBN || books.ISBN,
                        quantity: req.body.quantity || books.quantity,
                        available: req.body.available || books.available
                    })
                    .then(updatedBooks => res.status(200).send(updatedBooks))
                    .catch(err => res.status(400).send(err));
            })
            .catch(err => res.status(400).send(err));
    },
    list(req, res) {
        return Books
            .findAll({
                attributes: ['title', 'ISBN', 'description'],
                include: [{
                    model: Authors,
                    //attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(authors => res.status(200).send(authors))
            .catch(err => res.status(400).send(err));
    },
    delete(req, res) {
        return Books
            .destroy({
                where: { id: req.params.bookId }
            }).then(books => {
                if (!books) {
                    res.status(404).send('Book not found');
                }
                if (books) {
                    res.status(200).send('Book deleted');
                }
            })
            .catch(err => res.status(404).send(err));
    }

};