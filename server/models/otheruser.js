'use strict';
module.exports = function(sequelize, DataTypes) {
    var OtherUser = sequelize.define('OtherUser', {
        guid: { type: DataTypes.UUID, unique: true, defaultValue: DataTypes.UUIDV4 },
        authId: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        token: DataTypes.STRING,
        admin: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
    OtherUser.associate = (models) => {
        // associations can be defined here
        OtherUser.belongsTo(models.User, {
            foreignKey: 'userId',
            otherkey: 'guid',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

    };
    return OtherUser;
};