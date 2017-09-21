const Owners = require('../models').Ownership;

module.exports = {
    create(req, res) {
        return Owners
            .create({
                author_id: req.body.author_id,
                book_id: req.body.book_id
            })
            .then(owners => res.status(200).send(owners))
            .catch(err => res.status(400).send(err));
    },

    list(req, res) {
        return Owners
            .all()
            .then(books => res.status(200).send(books))
            .catch(err => res.status(400).send(err));
    }
};