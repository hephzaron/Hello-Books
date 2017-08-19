// ths add books to the library

const SignIn = require('../models').SignIn;
const Books = require('../models').Books;

module.exports = {
    create(req, res) {
        return SignIn
            .create({
                user_id: req.body.user_id,
                password: req.body.password
            })
            .then(signin => res.status(201).send(signin))
            .catch(err => res.status(400).send(err));
    },
    list(req, res) {
        return SignIn
            .findAll({
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })
            .then(signin => res.status(200).send(signin))
            .catch(err => res.status(400).send(err));
    }
};