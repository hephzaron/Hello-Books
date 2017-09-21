'use strict';
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        title: DataTypes.STRING,
        genre_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        ISBN: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        available: DataTypes.INTEGER
    });
    Book.associate = (models) => {
        // associations can be defined here
        Book.hasMany(models.Borrowed, {
            foreignKey: 'book_id',
            as: 'borrowed'

        });
        Book.hasMany(models.Ownership, {
            foreignKey: 'book_id',
            as: 'owners'

        });
        Book.belongsTo(models.Genre, {
            foreignKey: 'genre_id',
            onDelete: 'CASCADE'
        });

    };
    return Book;
};