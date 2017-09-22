const Users = require('../models').User;
const jwt = require('jsonwebtoken');
const Books = require('../models').Book;

module.exports = {
    // allow new users to register
    create(req, res) {
        return Users
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(users => res.status(201).send(users))
            .catch(err => res.status(401).send(err));
    },
    listUser(req, res) {
        return Users
            .find({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then(user => res.status(201).send(user))
            .catch(err => res.status(401).send(err));
    },
    signIn(req, res) {
        Users.find({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then(user => {
                if (!user) {
                    res.json('username or password not correct');
                }
                // if user is found and password is right
                if (user) {
                    var userToken = jwt.sign({ username: req.body.username }, 'i love programming');
                    res.json(userToken);
                }

            }).catch(err => res.status(401).send(err));
    },

    userBooks(req, res) {
        return Users
            .findAll({
                include: [{
                    model: Books,
                    attributes: ['title', 'ISBN'],
                    through: {
                        attributes: ['returned'],
                        where: { returned: false }
                    }
                }]
            })
            .then(userBooks => res.status(201).send(userBooks))
            .catch(err => res.status(400).send(err));

    },
    // get list of books by a specific user
    retrieveOne(req, res) {
        return Users
            .find({
                where: {
                    id: req.params.userId
                },
                include: [{
                    model: Books,
                    attributes: ['title', 'ISBN'],
                    through: {
                        attributes: ['returned'],
                        where: {
                            returned: req.query.returned
                        }
                    }
                }]
            })
            .then(borrowedBooks => res.status(201).send(borrowedBooks))
            .catch(err => res.status(201).send(err));
    }

};