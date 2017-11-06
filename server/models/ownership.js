'use strict';
module.exports = function(sequelize, DataTypes) {
    var Ownership = sequelize.define('Ownership', {
        ownerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        authorId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER
    });

    return Ownership;
};