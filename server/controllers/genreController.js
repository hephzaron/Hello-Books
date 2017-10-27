const Genres = require('../models').Genre;
const Books = require('../models').Book;

module.exports = {
    create(req, res) {
        return Genres
            .create({
                name: req.body.name
            })
            .then(genres => res.status(200).send(genres))
            .catch(err => res.status(400).send(err));
    },
    list(req, res) {
        return Genres
            .findAll({
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })
            .then(genres => res.status(200).send(genres))
            .catch(err => res.status(400).send(err));
    }
};