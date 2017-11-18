'use strict';
module.exports = function(sequelize, DataTypes) {
    var GoogleUser = sequelize.define('GoogleUser', {
        guid: { type: DataTypes.UUID, unique: true, defaultValue: DataTypes.UUIDV4 },
        googleId: DataTypes.STRING,
        username: DataTypes.STRING,
        gmail: DataTypes.STRING,
        token: DataTypes.STRING,
        admin: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
    GoogleUser.associate = (models) => {
        // associations can be defined here
        GoogleUser.belongsTo(models.User, {
            foreignKey: 'userId',
            otherkey: 'guid',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

    };
    return GoogleUser;
};