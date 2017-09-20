const Users = require('../models').User;
const jwt = require('jsonwebtoken');

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
    signIn: function(req, res) {
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
    }
};