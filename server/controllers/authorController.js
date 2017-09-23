const Authors = require('../models').Author;
const Books = require('../models').Book;

module.exports = {
    create(req, res) {
        return Authors
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                name: req.body.first_name + ' ' + req.body.last_name
                    //life_span: req.body.date_of_death - req.body.date_of_birth
            })
            .then(authors => res.status(200).send(authors))
            .catch(err => res.status(400).send(err));
    },
    authorBooks(req, res) {
        return Authors
            .findAll({
                attributes: ['name'],
                include: [{
                    model: Books,
                    attributes: ['title', 'ISBN', 'description'],
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(authors => res.status(200).send(authors))
            .catch(err => res.status(400).send(err));
    },
    retrieveOne(req, res) {
        return Authors
            .find({
                where: {
                    id: req.params.authorId
                },
                attributes: ['name'],
                include: [{
                    model: Books,
                    attributes: ['title', 'ISBN', 'description'],
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(authors => res.status(200).send(authors))
            .catch(err => res.status(400).send(err));
    }
};