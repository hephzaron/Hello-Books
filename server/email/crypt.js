/**hash email password */
const crypto = require('crypto');

const alg = 'aes-256-ctr';
const password = process.env.cryptoKey || 'secretPassword';

function encrypt(text) {
    const cipher = crypto.createCipher(alg, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipher(alg, password);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;