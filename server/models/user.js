'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Borrowed, {
                    foreignKey: 'user_id',
                    as: 'borroweds'

                });
            }
        }
    });
    return User;
};