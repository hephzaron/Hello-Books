'use strict';
module.exports = function(sequelize, DataTypes) {

    var Borrowed = sequelize.define('Borrowed', {
        borrowId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.UUID, compoundKey: true },
        bookId: { type: DataTypes.INTEGER, compoundKey: true },
        returned: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
    return Borrowed;
};