'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Ownerships', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Ownerships', [{
                    authorId: 2,
                    bookId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    authorId: 1,
                    bookId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, {
                    authorId: 1,
                    bookId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, {
                    authorId: 2,
                    bookId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Ownerships', null, {});

    }
};