const Genres = require('../models').Genre;
const Books = require('../models').Book;

module.exports = {
    create(req, res) {
        return Genres
            .create({
                name: req.body.name
            })
            .then(genre => res.status(201).send({
                message: `${genre.name} have been added to category`,
                genre
            }))
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    },
    list(req, res) {
        return Genres
            .findAll({
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })
            .then(genres => res.status(200).send({ genres }))
            .catch(() => res.status(400).send({ message: 'Internal Server Error' }));
    }
};