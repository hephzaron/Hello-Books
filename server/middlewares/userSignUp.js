// Ensure username and email entry at registration is unique

const Users = require('../models').User;

module.exports = {
    signUp: function(req, res, next) {
        Users.find({
            where: {
                username: req.body.username
            }
        }).then(
            user => {
                if (!user) {
                    Users.find({
                        where: {
                            email: req.body.email
                        }
                    }).then(userEmail => {
                        if (!userEmail) {
                            next();
                        }
                        if (userEmail) {
                            res.status(406).send('This email is registered');
                        }
                    }).catch(err => res.status(404).send(err));

                }
                if (user) {
                    res.status(406).send('username already exist');
                }
            }
        ).catch(err => res.status(404).send(err));
    }
};