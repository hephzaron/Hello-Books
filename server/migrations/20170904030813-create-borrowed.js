'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Borroweds', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bookId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            returned: {
                type: Sequelize.BOOLEAN,
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
    down: function(queryInterface /*, Sequelize*/ ) {
        return queryInterface.dropTable('Borroweds');
    }
};