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
        Book.belongsToMany(models.User, {
            through: models.Borrowed,
            foreignKey: 'bookId'
        });
        Book.belongsToMany(models.Author, {
            through: models.Ownership,
            foreignKey: 'bookId'
        });
        Book.belongsTo(models.Genre, {
            foreignKey: 'genre_id',
            onDelete: 'CASCADE'
        });

    };
    return Book;
};