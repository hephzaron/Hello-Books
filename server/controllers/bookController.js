const Books = require('../models').Book;

module.export = {
    // add book to library
    create(req, res) {
        return Books
            .create({
                title: req.body.title,
                genre_id: req.body.genre_id,
                description: req.body.description,
                ISBN: req.body.ISBN,
                quantity: req.body.quantity,
                available: req.body.available
            })
            .then(books => res.status(200).send(books))
            .catch(err => res.status(400).send(err));
    }
}