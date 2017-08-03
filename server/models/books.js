'use strict';
module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define('Books', {
        title: DataTypes.STRING,
        bookInfo: DataTypes.STRING,
        quantity: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Books;
};