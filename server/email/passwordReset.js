const path = require('path');
const crypto = require('crypto');
const tempdir = path.join(__dirname, './template/forget-password.ejs');
const sendEmail = require('./sendMail').sendEmail;
const User = require('../models').User;
const LocalUser = require('../models').LocalUser;
const generateJWT = require('../middlewares/authorize').generateJWT;
let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;

function generateRandom() {
    return crypto.randomBytes(20, (err, buffer) => {
        let random = buffer.toString('hex');
        return random;
    });

}

function forgotPassword(req, res) {
    return User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user) {
            res.status(404).send({ message: 'User does not exist' });
        }
        let userEmail = user.email;
        let now = new Date();
        let resetToken = generateRandom();
        let tokenExpire = Math.floor(new Date().getTime() / 1000) + (10 * 60); //token expire in 10minutes
        if (resetToken) {
            const baseURL = 'https://hi-lib.herokuapp.com/api/v1';
            let data = {
                username: user.username,
                url: `${baseURL}/auth/reset_password?token=${resetToken}`,
                date: now
            };
            return LocalUser.findOne({ where: { email: user.email } }).then((localuser) => {
                if (!localuser) {
                    res.status(404).send({ message: 'User does not exist' });
                }
                if (localuser) {
                    return LocalUser.update({
                        resetPasswordToken: resetToken,
                        resetPasswordExpires: tokenExpire
                    }).then(() => {
                        res.status(200).send({ message: 'Check your email for the reset link' });
                        sendEmail(userEmail, tempdir, data, 'Reset your password');
                    }).catch(err => { throw err; });
                }
            });
        }
    });

}

function resetPassword(req, res, next) {
    let resetToken = req.query.token;
    let now = Math.floor(new Date().getTime() / 1000);
    if (!resetToken) {
        res.send('Token invalid or expired').redirect(303, '/signin');
    }
    if (resetToken) {
        return LocalUser.findOne({
            where: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: { $gte: now }
            }
        }).then((user) => {
            if (!user) {
                res.status(401).send({ message: 'Token invalid or expired' });
            }
            if (user) {
                let req = httpMocks.createRequest({
                    method: 'POST',
                    params: {},
                    body: {
                        username: user.username
                    }
                });
                let res = httpMocks.createResponse({
                    eventEmitter: EventEmitter
                });
                res.once('send', () => {
                    let token = res._getData().token;
                    if (token) {
                        next();
                    }
                });
                generateJWT(req, res);
            }

        }).catch(() => {
            res.status(500).send({ message: 'Internal Server Error' });
        });
    }
}

exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;