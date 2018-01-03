'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Borroweds', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Borroweds', [{
                    userId: 1,
                    bookId: 1,
                    returned: false,
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    userId: 2,
                    bookId: 3,
                    returned: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Borroweds', null, {});
    }
};