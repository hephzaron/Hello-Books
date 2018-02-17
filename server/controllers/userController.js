const Users = require('../models').User;
const LocalUsers = require('../models').LocalUser;
const Books = require('../models').Book;
const Crypto = require('crypto');

function validPassword(password, userSalt, userHash) {
    var hash = Crypto.pbkdf2Sync(password, userSalt, 1000, 64, 'SHA1').toString('hex');
    return userHash === hash;
}

module.exports = {
    // allow new users to register
    create(req, res, next) {
        return LocalUsers
            .create({
                username: req.body.username,
                email: req.body.email,
                setPassword: req.body.password,
                admin: req.body.admin
            })
            .then(localusers => {
                return Users.create({
                    userId: localusers.uuid,
                    email: localusers.email,
                    admin: localusers.admin,
                    username: localusers.username
                }).then((user) => {
                    if (user) {
                        next();
                    }
                });
            })
            .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    },
    signIn(req, res, next) {
        LocalUsers.find({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (!user) {
                    res.status(404).send({
                        message: 'incorrect username or password'
                    });
                }
                // if user is found verify password
                if (user) {
                    try {
                        const verifyPassword = validPassword(req.body.password, user.salt, user.hash);
                        if (verifyPassword) {
                            next();
                        }
                        if (!verifyPassword) {
                            res.status(404).send({
                                message: 'incorrect username or password'
                            });
                        }
                    } catch (e) {
                        res.status(404).send({
                            message: 'incorrect username or password'
                        });
                    }
                }

            }).catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    },
    // get all books borrowed by all respective users
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
            .then(userBooks => res.status(200).send({ userBooks }))
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));

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
            .then(borrowedBooks => res.status(200).send({ borrowedBooks }))
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    },

    getAllUser(req, res) {
        return Users.findAll({}).then((allUsers) => {
            return res.status(200).send({ allUsers });
        }).catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
    },

    getUser(req, res) {
        const { userId } = req.params;
        return Users.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            return res.status(200).send({ user });
        }).catch(() => {
            return res.status(500).send({ message: 'Internal Server Error' });
        });
    }

};