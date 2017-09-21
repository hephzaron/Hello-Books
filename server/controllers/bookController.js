const Books = require('../models').Book;
const Owners = require('../models').Ownership;

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
            .then(books => res.status(200).send(books))
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
            .findAll({
                include: [{
                    model: Owners,
                    as: 'owners'
                }]

            })
            .then(owners => {
                if (!owners) {
                    return res.status(404).send({
                        message: 'Book not found'
                    });
                }
                return res.status(200).send(owners);
            })
            .catch(err => res.status(400).send(err));
    }
};