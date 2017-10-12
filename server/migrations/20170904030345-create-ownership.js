'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Ownerships', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            authorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'Authors',
                    key: 'id',
                    as: 'authorId'
                }
            },
            bookId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'Books',
                    key: 'id',
                    as: 'bookId'
                }
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
        return queryInterface.dropTable('Ownerships');
    }
};