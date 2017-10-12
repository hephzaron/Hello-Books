'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: { isEmail: true }
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            admin: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            salt: {
                allowNull: true,
                type: Sequelize.STRING
            },
            hash: {
                allowNull: true,
                type: Sequelize.STRING
            },
            memValue: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'platinum'
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
    down: function(queryInterface /*, Sequelize*/ ) {
        return queryInterface.dropTable('Users');
    }
};