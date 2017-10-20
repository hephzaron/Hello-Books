const Users = require('../models').User;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';

function generateGUID() {
    var now = new Date().getTime();
    return now;
}

function decodeJWT(token, res) {
    // verifies secret 
    const decoded = jwt.decode(token, secret, { algorithm: 'HS256' });
    if (!decoded) {
        return res.status(401).send('You are not authorized to view this page');
    }
    if (decoded) {
        return decoded;
    }
}

module.exports = {

    // generate token and send to user
    generateJWT: function(req, res) {
        Users.find({
                where: {
                    username: req.body.username
                }
            }).then(user => {
                const GUID = generateGUID();

                // By default, expire the token after 7 days.
                // NOTE: the value for 'exp' needs to be in seconds since
                // the epoch as per the spec!
                var expiresDefault = Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60;
                var payload = {
                    auth: GUID,
                    agent: req.headers['user-agent'],
                    exp: expiresDefault,
                    username: req.body.username,
                    admin: user.admin
                };

                var signed = jwt.sign(payload, secret, { algorithm: 'HS256' });

                res.cookie('loginCookie', signed, {
                    httpOnly: true,
                    signed: true,
                    maxAge: 1000 * 60 * 60 * 12
                });
                res.json(signed);
            })
            .catch(err => res.status(404).send(err));

    },


    verifyUser: function(req, res, next) {
        const loginCookie = req.signedCookies.loginCookie;
        if (!loginCookie) {
            return res.redirect(303, '/api/users/signin');
        }
        if (loginCookie) {
            const decoded = decodeJWT(loginCookie, res);
            res.json(decoded);
        }
    },

    // Authorize user-admin only to perform certain actions
    adminProtect: function(req, res, next) {
        // check header  for token
        var token = req.headers['user-agent'];
        if (!token) {
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
        if (token) {

            const decoded = decodeJWT(token, res);
            if (decoded.admin == true) {
                next();
            } else if (decoded.admin == false) {
                res.status(401).send('You are not authorized to perform this action');
            }

        }
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