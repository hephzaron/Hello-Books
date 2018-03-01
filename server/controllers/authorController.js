const Authors = require('../models').Author;
const Books = require('../models').Book;
const paginate = require('./paginate').paginate;
const returnObject = require('./paginate').returnObject;

module.exports = {
    create(req, res) {
        return Authors
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath
            })
            .then(author => {
                return res.status(201).send({
                    message: `${author.fullName}, successfully added`,
                    author
                });
            })
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    },
    getAuthors(req, res) {
        const { count, page } = req.query;
        const { authorId } = req.params
        let { limit, offset } = paginate(page, count);
        return Authors.findAll({
            where: (
                authorId ? { id: authorId } : {}
            ),
            limit,
            offset,
            order: [
                ['id', 'ASC']
            ],
            include: {
                model: Books
            }
        }).then((authors) => {
            if (!authors || authors.length === 0) {
                return res.status(200).send({
                    message: 'Oops! No author exists in this collection'
                });
            }
            return res.status(200).send(returnObject(authors, 'authors'))
        }).catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
    },

    update(req, res) {
        return Authors
            .find({
                where: {
                    id: req.params.authorId
                }
            })
            .then(authors => {
                if (!authors) {
                    res.status(404).send({
                        message: 'Author does not exist'
                    });
                }
                authors.update({
                        firstName: req.body.firstName || authors.firstName,
                        lastName: req.body.lastName || authors.lastName,
                        dateOfBirth: req.body.dateOfBirth || authors.dateOfBirth,
                        dateOfDeath: req.body.dateOfDeath || authors.dateOfDeath
                    })
                    .then(updatedAuthor => res.status(200).send({
                        message: `${updatedAuthor.fullName} record has been updated`,
                        updatedAuthor
                    }))
                    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
            })
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    },
    delete(req, res) {
        return Authors
            .destroy({
                where: { id: req.params.authorId }
            }).then(authors => {
                if (!authors) {
                    res.status(404).send({ message: 'Author not found' });
                }
                if (authors) {
                    res.status(200).send({ message: 'Author removed successfully' });
                }
            })
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    }
};