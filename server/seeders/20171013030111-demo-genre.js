'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Genres', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Genres', [{
                    name: 'Computer science',
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    name: 'World Government and Hstory',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, {
                    name: 'Data Science',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Genres', null, {});

    }
};