'use strict';
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        title: DataTypes.STRING,
        author_id: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        ISBN: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        available: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Book.hasMany(models.Borrowed, {
                    foreignKey: 'book_id',
                    as: 'borroweds'

                });
                Book.hasMany(models.Ownership, {
                    foreignKey: 'book_id',
                    as: 'ownerships'

                });
                Book.belongsTo(models.Genre, {
                    foreignKey: 'genre_id',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
    return Book;
};