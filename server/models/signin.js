'use strict';
module.exports = function(sequelize, DataTypes) {
    const SignIn = sequelize.define('SignIn', {
        user_id: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return SignIn;
}