'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                primaryKey: true,
                validate: { isEmail: true }
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
            memValue: {
                allowNull: false,
                type: Sequelize.ENUM('platinum', 'silver', 'gold'),
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