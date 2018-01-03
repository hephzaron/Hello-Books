const LocalUsers = require('../models').LocalUser;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';

//import user model

function generateGUID() {
    var now = new Date().getTime();
    return now;
}

module.exports = {

    // generate token and send to user
    generateJWT: function(req, res) {
        return LocalUsers.find({
                where: {
                    username: req.body.username
                }
            }).then(user => {
                const GUID = generateGUID();

                // By default, expire the token after 1hour
                // NOTE: the value for 'exp' needs to be in seconds since
                // the epoch as per the spec!
                var expiresDefault = Math.floor(new Date().getTime() / 1000) + (1 * 60 * 60);
                var payload = {
                    auth: GUID,
                    agent: req.headers['user-agent'],
                    exp: expiresDefault,
                    username: req.body.username,
                    admin: user.admin
                };

                var token = jwt.sign(payload, secret, { algorithm: 'HS256' });

                res.cookie('loginCookie', token, {
                    httpOnly: true,
                    signed: false,
                    maxAge: 1000 * 60 * 60 * 12
                });
                res.status(200).send({ 'token': token, 'user': user });
            })
            .catch(err => res.status(404).send(err));

    },

    verifyUser: function(req, res, next) {
        try {
            let token = req.headers['authorization'];
            let decoded = jwt.verify(token, secret, { algorithm: 'HS256' });

            return LocalUsers.findOne({ where: { username: decoded.username } }).then((user) => {
                if (!user) {
                    res.status(404).send('Token invalid or expired-user not found');
                }
                next();
            }).catch(err => { throw err; });
        } catch (e) {
            res.status(401).send('please login');
        }

    },

    // Authorize user-admin only to perform certain actions
    adminProtect: function(req, res, next) {
        // check header  for token
        try {
            let token = req.headers['authorization'];

            let decoded = jwt.decode(token, secret, { algorithm: 'HS256' });
            if (decoded === null) {
                res.status(400).send('Token not provided');

            } else if (decoded.admin === false) {
                res.status(401).send('You are not authorized to perform this action');
            } else if (decoded.admin === true) {
                next();
            }
        } catch (error) { res.status(400).send(error); }
    },

    logout: function(req, res) {
        //Check if user is logged in 
        const loginCookie = req.signedCookies.loginCookie;
        if (!loginCookie) {
            res.redirect(303, '/api/users/signin');
        }
        if (loginCookie) {
            res.clearCookie('loginCookie').send('you are logged out');
        }
    }

};