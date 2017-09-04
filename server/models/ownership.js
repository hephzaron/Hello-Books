'use strict';
module.exports = function(sequelize, DataTypes) {
    var Ownership = sequelize.define('Ownership', {
        author_id: DataTypes.INTEGER,
        book_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Ownership.belongsTo(models.Book, {
                    foreignKey: 'book_id',
                    onDelete: 'CASCADE'
                });
                Ownership.belongsTo(models.Author, {
                    foreignKey: 'author_id',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
    return Ownership;
};