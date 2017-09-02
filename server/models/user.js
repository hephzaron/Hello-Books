'use strict';
module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        user_id: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING

    });
    Users.associate = (models) => {
        Users.hasMany(models.Books, {
            foreignKey: 'userId',
            as: 'books'
        });
    };
    return Users;

};