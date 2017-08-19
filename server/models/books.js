'use strict';
module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define('Books', {
        userId:DataTypes.STRING,
        title: DataTypes.STRING,
        bookInfo: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }) /*{
        classMethods: {
            associate: function(models) {
                // establish relationship between books and user
                Books.belongsTo(models.User, {
                    foriegnKey: 'userId',

                    // Update books in library of roles if onDelete is called
                    onDelete: 'CASCADE'
                });
            }
}*/ 
    return Books;
};