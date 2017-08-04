// ths add books to the library

const SignIn = require('.../models').SignIn;

module.exports = {
    create(req, res) {
        return SignIn
            .create({
                user_id: req.body.user_id,
                password: req.body.password
            })
            .then(signin => res.status(201).send(signin))
            .catch(err => res.status(400).send(err));
    }
};