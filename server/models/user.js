'use strict';
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        user_id: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING

    }, {
        classMethods: {
            associate: function(models) {
                // Each User is attached to a list of book borrowed from
                // the library
                User.hasMany(models.Books, {

                    foreignKey: 'userId',
                    as: 'books'

                });
            }
        }
    });
    return User;
};