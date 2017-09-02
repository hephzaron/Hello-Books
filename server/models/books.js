'use strict';
module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define('Books', {
        title: DataTypes.STRING,
        bookInfo: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        returned: DataTypes.BOOLEAN
    });
    Books.associate = (models) => {
        Books.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Books;
};