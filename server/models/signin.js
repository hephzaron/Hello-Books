'use strict';
module.exports = function(sequelize, DataTypes) {
    var SignIn = sequelize.define('SignIn', {
        user_id: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // Each User is attached to a list of book borrowed from
                // the library
                SignIn.hasMany(models.Books, {

                    foreignKey: 'userId',
                    as: 'books'

                });
            }
        }
    });
    return SignIn;
};