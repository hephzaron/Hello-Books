// ths add books to the library

const User = require('.../models').User;

module.exports = {
    create(req, res) {
        return User
            .create({
                user_id: req.body.user_id,
                email: req.body.email,
                password: req.body.password
            })
            .then(users => res.status(201).send(users))
            .catch(err => res.status(400).send(err));
    }
};