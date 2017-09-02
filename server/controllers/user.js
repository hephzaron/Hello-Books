// ths add books to the library

const Users = require('../models').Users;
const Books = require('../models').Books;


module.exports = {
    create(req, res) {
        return Users
            .create({
                user_id: req.body.user_id,
                email: req.body.email,
                password: req.body.password
            })
            .then(users => res.status(201).send(users))
            .catch(err => res.status(400).send(err));
    },
    list(req, res) {
        return Users
            .findAll({
                include: [{
                    model: Books,
                    as: 'books'
                }]
            })
            .then(users => res.status(200).send(users))
            .catch(err => res.status(400).send(err));
    }

};