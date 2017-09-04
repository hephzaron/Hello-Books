'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Authors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date_of_birth: {
                allowNull: false,
                type: Sequelize.DATE
            },
            date_of_death: {
                type: Sequelize.DATE
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            life_span: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('Authors');
    }
};