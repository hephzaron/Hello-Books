const bookCount = require('./bookCount');
const userCount = require('./userCount');
const userSignUp = require('./userSignUp');
const membershipVal = require('./membershipVal');
const authorize = require('./authorize');
const isLoggedIn = require('./isLoggedIn');
const newPassword = require('./newPassword');

module.exports = {
    bookCount,
    userCount,
    userSignUp,
    membershipVal,
    authorize,
    isLoggedIn,
    newPassword
};