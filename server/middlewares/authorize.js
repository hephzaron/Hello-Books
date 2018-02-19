const LocalUsers = require('../models').LocalUser;
const Users = require('../models').User;
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
            if (!user) {
                return res.status(401).send({ message: 'Token invalid or expired-user not found' });
            }
            const GUID = generateGUID();

            // By default, expire the token after 1hour
            // NOTE: the value for 'exp' needs to be in seconds since
            // the epoch as per the spec!
            let expiresDefault = Math.floor(new Date().getTime() / 1000) + (24 * 60 * 60);
            let payload = {
                auth: GUID,
                agent: req.headers['user-agent'],
                exp: expiresDefault,
                username: req.body.username,
                admin: user.admin
            };

            let token = jwt.sign(payload, secret, { algorithm: 'HS256' });

            return Users.find({
                where: {
                    userId: user.uuid
                }
            }).then(userProp => {
                return res.status(200).send({
                    message: 'Authentication successful',
                    user: {
                        username: userProp.username,
                        token: token,
                        userId: userProp.id,
                        admin: userProp.admin
                    }
                });
            }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
        }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));

    },

    verifyUser: function(req, res, next) {
        try {
            let token = req.headers['x-access-token'];
            let decoded = jwt.verify(token, secret, { algorithm: 'HS256' });

            return LocalUsers.findOne({ where: { username: decoded.username } }).then((user) => {
                if (!user) {
                    res.status(401).send({ message: 'Token invalid or expired-user not found' });
                }
                next();
            }).catch(() => {
                res.status(500).send({ message: 'Internal Server Error' });
            });
        } catch (e) {
            res.status(401).send({ message: 'Token invalid or expired-user not found' });
        }

    },

    // Authorize user-admin only to perform certain actions
    adminProtect: function(req, res, next) {
        // check header  for token
        try {
            let token = req.headers['x-access-token'];

            let decoded = jwt.decode(token, secret, { algorithm: 'HS256' });
            if (decoded === null) {
                res.status(401).send({ message: 'Your session has expired. Please try logging in again' });

            } else if (decoded.admin === false) {
                res.status(403).send({ message: 'You are not authorized to perform this action' });
            } else if (decoded.admin === true) {
                next();
            }
        } catch (e) { res.status(500).send({ message: 'Internal Server Error' }); }
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