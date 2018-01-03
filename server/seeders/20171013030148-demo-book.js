'use strict';

//seed data for book creation

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Books', null, {})
            .then(() => {
                return queryInterface.bulkInsert('Books', [{
                    title: 'Java programming for beginners',
                    genre_id: 1,
                    description: 'Ths introduces readers to the basic of Obejct Oriented Programmng Language',
                    ISBN: '33332-143-2457',
                    quantity: 7,
                    available: 7,
                    createdAt: new Date(),
                    updatedAt: new Date()

                }, {
                    title: 'Fundamentals of Statistics for Data Scientist',
                    genre_id: 3,
                    description: 'Learn the fundamentals of big data analysis',
                    ISBN: '12-70-894-53',
                    quantity: 3,
                    available: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, {
                    title: 'R - the tool for data science',
                    genre_id: 3,
                    description: 'R language is the most widely used language for data analysis..',
                    ISBN: '102-70-8934-5757',
                    quantity: 5,
                    available: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
            });

    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Books', null, {});

    }
};