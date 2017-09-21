'use strict';
module.exports = function(sequelize, DataTypes) {
    var Genre = sequelize.define('Genre', {

        name: DataTypes.TEXT
    });
    Genre.associate = (models) => {
        // associations can be defined here
        Genre.hasMany(models.Book, {
            foreignKey: 'genre_id',
            as: 'books'
        });

    };
    return Genre;
};