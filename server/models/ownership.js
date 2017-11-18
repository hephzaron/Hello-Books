'use strict';
module.exports = function(sequelize, DataTypes) {
    var Ownership = sequelize.define('Ownership', {
        ownerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        authorId: { type: DataTypes.INTEGER, compoundKey: true },
        bookId: { type: DataTypes.INTEGER, compoundKey: true }
    });

    return Ownership;
};