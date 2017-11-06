'use strict';
module.exports = function(sequelize, DataTypes) {
    var Borrowed = sequelize.define('Borrowed', {
        borrowId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
        returned: DataTypes.BOOLEAN
    });
    /*Borrowed.associate = (models) => {
        // associations can be defined here
        Borrowed.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
        Borrowed.belongsTo(models.Book, {
            foreignKey: 'book_id',
            onDelete: 'CASCADE'
        });

};*/
    return Borrowed;
};