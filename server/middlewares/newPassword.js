const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';
const LocalUsers = require('../../server/models').LocalUser;

function verifyUser(req, res, next) {
    //get user credentials from token after login
    const token = req.headers['x-access-token'];
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(404).send({ message: 'Token invalid or expired, please login' });
            }

            res.status(404).send({ message: 'Cannot verify user, please login' });
        }
        if (decoded) {
            next();
        }
    });

}

function changePassword(req, res) {
    let decoded = jwt.decode(req.headers['x-access-token'], secret, { algorithm: 'HS256' });
    let username = decoded.username;
    return LocalUsers.findOne({ where: { username: username } }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User does not exist'
            });
        } else if (user) {
            let newPassword = req.body.newPassword;
            let confirmPassword = req.body.confirmPassword;

            if (newPassword === confirmPassword) {
                return user.update({
                    setPassword: confirmPassword
                }).then(() => {
                    res.status(200).send({
                        message: 'Password change successful, please login to your account'
                    });

                }).catch(() => {
                    res.status(500).send({
                        message: 'Internal Server Error'
                    });
                });
            } else if (newPassword !== confirmPassword) {
                res.status(400).send({
                    message: 'Password does not match'
                });
            }
        }
    });
}

exports.verifyUser = verifyUser;
exports.changePassword = changePassword;