'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Authors', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Authors', [{
                    firstName: 'Nelkon',
                    lastName: 'Parker',
                    dateOfBirth: '12-03-1876',
                    dateOfDeath: '15-10-1994',
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    firstName: 'Charles',
                    lastName: 'Philip',
                    dateOfBirth: '12-03-1820',
                    dateOfDeath: '15-10-1900',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Authors', null, {});

    }
};