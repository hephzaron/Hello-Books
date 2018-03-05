const path = require('path');
const crypto = require('crypto');
const tempdir = path.join(__dirname, './template/forget-password.ejs');
const sendEmail = require('./sendMail').sendEmail;
const User = require('../models').User;
const LocalUser = require('../models').LocalUser;
const generateJWT = require('../middlewares/authorize').generateJWT;
let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let random;

function generateRandom() {
    return crypto.randomBytes(20, (err, buffer) => {
        random = buffer.toString('hex');
    });
}

function forgotPassword(req, res) {
    return User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User does not exist'
            });
        }
        let userEmail = user.email;
        const resetToken = generateRandom();
        const tokenExpire = Math.floor(new Date().getTime() / 1000) + (15 * 60); //token expire in 10minutes
        if (resetToken) {
            const baseURL = 'https://hi-lib.herokuapp.com/api/v1';
            let data = {
                username: user.username,
                url: `${baseURL}/auth/reset_password?token=${random}`,
                date: Date()
            };
            return LocalUser.findOne({
                where: {
                    email: user.email
                }
            }).then((localuser) => {
                if (!localuser) {
                    return res.status(404).send({
                        message: 'User does not exist'
                    });
                }
                return localuser.update({
                    resetPasswordToken: random,
                    resetPasswordExpires: tokenExpire
                }).then(() => {
                    sendEmail(userEmail, tempdir, data, 'Reset your password');
                    return res.status(200).send({
                        message: `Password reset link sent to ${userEmail}`
                    });
                }).catch(() => {
                    return res.status(500).send({
                        message: 'Internal Server Error '
                    })
                });
            }).catch(() => {
                return res.status(500).send({
                    message: 'Internal Server Error'
                })
            })
        }
    }).catch(() => {
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    })

}

function resetPassword(req, res) {
    let resetToken = req.query.token;
    let now = Math.floor(new Date().getTime() / 1000) - (60 * 60)
    if (!resetToken) {
        return res.status(403).send({
            message: 'You are not authorize to perform this action'
        })
    }
    if (resetToken) {
        return LocalUser.findOne({
            where: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: { $gte: now }
            }
        }).then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Token invalid or expired'
                });
            }
            if (user) {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    params: {},
                    body: {
                        username: user.username
                    }
                });
                let response = httpMocks.createResponse({
                    eventEmitter: EventEmitter
                });
                response.once('send', () => {
                    try {
                        let user = response._getData()['user'];
                        if (user) {
                            return res.status(200).send({
                                message: 'Password reset successful, you can now change your password',
                                user
                            });
                        }

                    } catch (e) {
                        return res.status(200).send({
                            message: 'Token invalid or expired'
                        });
                    }
                });
                generateJWT(request, response);
            }
        }).catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            })
        })
    }
}


exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;