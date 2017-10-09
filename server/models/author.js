'use strict';
module.exports = function(sequelize, DataTypes) {
    var Author = sequelize.define('Author', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        dateOfBirth: DataTypes.DATE,
        dateOfDeath: DataTypes.DATE

    }, {
        getterMethods: {
            fullName() {
                return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
            },
            lifeSpan() {
                if (this.dateOfDeath == null) {
                    return 'alive';
                } else {

                    return this.getDataValue('dateOfDeath') - this.getDataValue('dateOfBirth');
                }
            }
        },
        setterMethods: {
            fullName(value) {
                const names = value.split(' ');
                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
            }
        }
    });
    Author.associate = (models) => {
        // associations can be defined here
        Author.belongsToMany(models.Book, {
            through: models.Ownership,
            foreignKey: 'authorId'
        });
    };
    return Author;
};