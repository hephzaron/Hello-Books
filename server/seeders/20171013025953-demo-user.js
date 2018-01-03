'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Users', [{
                    username: 'John Doe',
                    email: 'pheonixera@gmail.com',
                    password: 'synix123',
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    username: 'John Billy',
                    email: 'pheonixeralip@gmail.com',
                    password: 'synix1234+',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});

    }
};