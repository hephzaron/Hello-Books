'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        memValue: DataTypes.STRING
    });
    User.associate = (models) => {
        // associations can be defined here
        User.belongsToMany(models.Book, {
            through: models.Borrowed,
            foreignKey: 'userId'
        });

    };
    return User;
};