'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('LocalUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                type: Sequelize.UUID
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
            resetPasswordToken: {
                type: Sequelize.STRING,
                allowNull: true
            },
            resetPasswordExpires: {
                type: Sequelize.INTEGER,
                allowNull: true
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