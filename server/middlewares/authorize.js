const LocalUsers = require('../models').LocalUser;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';

function generateGUID() {
    var now = new Date().getTime();
    return now;
}

function decodeJWT(token, res) {
    // verifies secret 
    const decoded = jwt.decode(token, secret, { algorithm: 'HS256' });
    return decoded;
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

                var token = jwt.sign(payload, secret, { algorithm: 'HS256' });

                res.cookie('loginCookie', token, {
                    httpOnly: true,
                    signed: false,
                    maxAge: 1000 * 60 * 60 * 12
                });
                res.json({
                    'token': token,
                    'body': user
                });
                //return token;
            })
            .catch(err => res.status(404).send(err));

    },

    verifyUser: function(req, res, next) {
        const loginCookie = req.cookies.loginCookie;
        if (!loginCookie) {
            return res.status(403).send('please login');
        }
        if (loginCookie) {
            //const decoded = decodeJWT(loginCookie, res);
            return next();
        }
    },

    // Authorize user-admin only to perform certain actions
    adminProtect: function(req, res, next) {
        // check header  for token
        try {
            const token = req.headers['authorization'];

            const decoded = decodeJWT(token, res);
            if (decoded == null) {
                res.status(400).send('Token not provided');

            } else if (decoded.admin == false) {

                res.status(401).send('You are not authorized to perform this action');
                // res.send(token);      
            } else if (decoded.admin == true) {

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