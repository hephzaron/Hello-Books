const Users = require('../models').User;
const LocalUsers = require('../models').LocalUser;
const Books = require('../models').Book;
const Crypto = require('crypto');

function validPassword(password, userSalt, userHash) {
    var hash = Crypto.pbkdf2Sync(password, userSalt, 1000, 64).toString('hex');
    return userHash === hash;
}

module.exports = {
    // allow new users to register
    create(req, res) {
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
                }).then(() => {
                    res.status(201).send(localusers);
                });
            })
            .catch(err => res.status(401).send(err));
    },
    signIn(req, res, next) {
        LocalUsers.find({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (!user) {
                    res.status(404).send('incorrect username or password');
                }
                // if user is found verify password
                if (user) {
                    try {
                        const verifyPassword = validPassword(req.body.password, user.salt, user.hash);
                        if (verifyPassword) {
                            next();
                        }
                        if (!verifyPassword) {
                            res.status(404).send('incorrect username or password');
                        }
                    } catch (e) {
                        res.status(404).send('please provide a password');
                    }
                }

            }).catch(err => res.status(401).send(err));
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