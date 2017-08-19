'use strict';
module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        user_id: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING

    });
    return Users;

}