// Ensure username and email entry at registration is unique

const LocalUsers = require('../models').LocalUser;

module.exports = {
    signUp: function(req, res, next) {

        return LocalUsers.find({
            where: {
                username: req.body.username
            }
        }).then(
            user => {
                if (!user) {
                    return LocalUsers.find({
                        where: {
                            email: req.body.email
                        }
                    }).then(userEmail => {
                        if (!userEmail) {
                            // if any user field is empty throw error
                            const {
                                username,
                                email,
                                password,
                                confirmPassword
                            } = req.body;
                            if (username === (null || '') || email === (null || '') || password === (null || '') || confirmPassword === (null || '')) {
                                res.status(400).send({ message: 'Some fields are empty' });
                            } else if (password !== confirmPassword) {
                                res.status(400).send({ message: 'Password does not match' });
                            } else {
                                next();
                            }
                        }
                        if (userEmail) {
                            res.status(409).send({ message: 'This email is registered' });
                        }
                    }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));

                }
                if (user) {
                    res.status(409).send({ message: 'username already exist' });
                }
            }
        ).catch((errors) => res.status(500).send({ message: 'Internal Server Error', errors }));

    }

};