const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogrammming'; // super secret

function generateGUID() {
    var now = new Date().getTime();
    return now;
}

//create json web token
function generateJWT(req, GUID, opts, res) {
    opts = opts || {};
    GUID = generateGUID();

    // By default, expire the token after 7 days.
    // NOTE: the value for 'exp' needs to be in seconds since
    // the epoch as per the spec!
    var expiresDefault = Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60;

    var token = jwt.sign({
        auth: GUID,
        agent: req.headers['user-agent'],
        exp: opts.expires || expiresDefault,
        username: req.body.username,
        admin: true
    }, secret);
    res.json(token);
}

function verify(token) {
    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false; // still false
    }
    return decoded;
}

module.exports = {
    generateJWT: generateJWT
};