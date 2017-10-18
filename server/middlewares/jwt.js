const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';

function generateGUID() {
    var now = new Date().getTime();
    return now;
}

module.exports = {
    generateJWT: function(req, res) {

        const GUID = generateGUID();

        // By default, expire the token after 7 days.
        // NOTE: the value for 'exp' needs to be in seconds since
        // the epoch as per the spec!
        var expiresDefault = Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60;

        var token = jwt.sign({
            auth: GUID,
            agent: req.headers['user-agent'],
            exp: expiresDefault,
            username: req.body.username,
            admin: false

        }, secret);
        res.cookie('id_token', token, {
            httpOnly: true,
            maxAge: expiresDefault
        });
        res.json(token);
    }

};