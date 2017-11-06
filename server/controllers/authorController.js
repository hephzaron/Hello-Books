const Authors = require('../models').Author;
const Books = require('../models').Book;

module.exports = {
    create(req, res) {
        return Authors
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath
            })
            .then(authors => { res.status(200).send(authors), console.log(authors.fullName); })
            .catch(err => res.status(400).send(err));
    },
    authorBooks(req, res) {
        return Authors
            .findAll({
                //attributes: ['name'],
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
                //attributes: ['name'],
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