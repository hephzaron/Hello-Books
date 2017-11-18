'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('LocalUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                primaryKey: true,
                validate: { isEmail: true },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'email',
                    as: 'email'
                }
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            hash: {
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
        return queryInterface.dropTable('LocalUsers');
    }
};