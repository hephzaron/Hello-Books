// used to create, sign, and verify tokens
const user = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
    signIn: function(req, res, next) {
        user.find({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json('username or password not correct');
                    return next();
                } else if (user) {
                    // if user is found and password is right
                    // create token
                    var token = jwt.sign(user, { expiresInMinutes: 1440 }); //expires in 24hrs
                    //return response to include user token
                    res.json({
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }).catch(err => res.status(401).send(err))
    }
};