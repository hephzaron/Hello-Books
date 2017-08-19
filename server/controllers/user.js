// ths add books to the library

const Users = require('../models').Users;


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
    }

};