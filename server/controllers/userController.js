const Users = require('../models').User;
const Books = require('../models').Book;
const Crypto = require('crypto');

function validPassword(password, userSalt, userHash) {
    var hash = Crypto.pbkdf2Sync(password, userSalt, 1000, 64).toString('hex');
    return userHash === hash;
}

module.exports = {
    // allow new users to register
    create(req, res) {
        return Users
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin,
                setPassword: req.body.password
            })
            .then(users => res.status(201).send(users))
            .catch(err => res.status(401).send(err));
    },
    signIn(req, res, next) {
        Users.find({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (!user) {
                    res.json('username not found');
                }
                // if user is found verify password
                if (user) {
                    try {
                        const verifyPassword = validPassword(req.body.password, user.salt, user.hash);
                        if (verifyPassword) {
                            //res.json('proceed');
                            next();
                        }
                        if (!verifyPassword) {
                            res.json('incorrect password');
                        }
                    } catch (e) {
                        res.json('please provide a password');
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