const jwt = require('jsonwebtoken');
const path = require('path');
const secret = process.env.JWT_SECRET || 'iloveprogramming';
const LocalUsers = require('../../server/models').LocalUser;
const sendMail = require('../email/sendMail').sendEmail;
const tempdir = path.join(__dirname, '../../server/email/template/reset-password.ejs');

function verifyUser(req, res, next) {
    //get user credentials from token after login
    const token = req.headers['authorization'];
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.send('Token invalid or expired, please login'); //.redirect(303, '/');
            }

            res.send('Cannot verify user, please login'); //.redirect(303, '/');
        }
        if (decoded) {
            next();
        }
    });

}

function changePassword(req, res) {
    let decoded = jwt.decode(req.headers['authorization'], secret, { algorithm: 'HS256' });
    let username = decoded.username;
    LocalUsers.findOne({ where: { username: username } }).then(user => {
        if (!user) {
            res.redirect(303, '/');
        }
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        if (newPassword === confirmPassword) {
            return LocalUsers.update({
                setPassword: confirmPassword
            }).then((localuser) => {
                let userEmail = localuser.email;
                let username = localuser.username;
                let data = {
                    username: username
                };
                //Notify user about change of password.
                sendMail(userEmail, tempdir, data, 'Password change successfull!');
                //let user login with new password
                res.redirect(303, '/login');
            }).catch(err => { throw err; });
        } else if (!(newPassword === confirmPassword)) {
            res.status(400).send('Password does not match');
        }
    });
}

exports.verifyUser = verifyUser;
exports.changePassword = changePassword;