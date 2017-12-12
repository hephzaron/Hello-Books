'use strict';

// hash password
const Crypto = require('crypto');
module.exports = function(sequelize, DataTypes) {
    var LocalUser = sequelize.define('LocalUser', {
        uuid: { type: DataTypes.UUID, unique: true, defaultValue: DataTypes.UUIDV4 },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        salt: DataTypes.STRING,
        hash: DataTypes.STRING,
        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpires: DataTypes.DATE,
        admin: { type: DataTypes.BOOLEAN, defaultValue: false }
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
    LocalUser.associate = (models) => {
        // associations can be defined here
        LocalUser.belongsTo(models.User, {
            foreignKey: 'userId',
            otherKey: 'uuid',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

    };
    return LocalUser;
};