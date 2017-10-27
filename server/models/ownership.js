'use strict';
module.exports = function(sequelize, DataTypes) {
    var Ownership = sequelize.define('Ownership', {
        authorId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER
    });

    return Ownership;
};