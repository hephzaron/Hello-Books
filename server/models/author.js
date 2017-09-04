'use strict';
module.exports = function(sequelize, DataTypes) {
    var Author = sequelize.define('Author', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        date_of_birth: DataTypes.DATE,
        date_of_death: DataTypes.DATE,
        name: DataTypes.STRING,
        life_span: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Author.hasMany(models.Ownership, {
                    foreignKey: 'author_id',
                    as: 'ownerships'

                });
            }
        }
    });
    return Author;
};