'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userId: DataTypes.UUID,
        email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
        admin: { type: DataTypes.BOOLEAN, defaultValue: false },
        memValue: { type: DataTypes.STRING, defaultValue: 'platinum' }
    });

    User.associate = (models) => {
        User.hasOne(models.LocalUser, {
            sourceKey: 'userId',
            targetKey: 'uuid',
            as: 'localUsers'
        });
        User.hasOne(models.GoogleUser, {
            sourceKey: 'userId',
            targetKey: 'guid',
            as: 'googleUsers'
        });
        User.belongsToMany(models.Book, {
            through: models.Borrowed,
            foreignKey: 'userId'
        });

    };

    return User;
}