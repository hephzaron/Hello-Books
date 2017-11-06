'use strict';
// hash password
const Crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: { type: DataTypes.BOOLEAN, defaultValue: false },
        salt: DataTypes.STRING,
        hash: DataTypes.STRING,
        memValue: { type: DataTypes.STRING, defaultValue: 'platinum' }
    }, {
        getterMethods: {
            validPassword: function(password) {
                var hash = Crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
                return hash;
            }
        },
        setterMethods: {
            setPassword: function(password) {
                this.setDataValue('salt', Crypto.randomBytes(16).toString('hex'));
                this.setDataValue('hash', Crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'));
            }
        }
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