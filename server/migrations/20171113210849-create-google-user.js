'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('GoogleUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            googleId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gmail: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
                validate: { isEmail: true },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'email',
                    as: 'gmail'
                }
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('GoogleUsers');
    }
};