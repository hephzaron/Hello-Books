/**Test data to be used for membership values, assume user have been registered earlier
 * --this will determine how long each user have been a member of the book club
 */

module.exports = {
    Users: [{
        email: 'tobi_daramola@yahoo.com',
        createdAt: (new Date()) - (10 * 24 * 60 * 60 * 1000), //resgistered 10days earlier
        updatedAt: new Date()

    }, {
        email: 'hephzaron@gmail.com',
        createdAt: (new Date()) - (20 * 24 * 60 * 60 * 1000), // registered 20days earlier
        updatedAt: new Date()
    }, {
        email: 'adeyemiadekunle@gmail.com',
        createdAt: (new Date()) - (30 * 24 * 60 * 60 * 1000), // registered 30days earlier
        updatedAt: new Date()
    }],

    Genres: [{
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
    }],
    Books: [{
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
    }, {
        title: 'Advanced statistics',
        genre_id: 3,
        description: 'Learn statistics in a more advanced way',
        ISBN: '102-70-8934-5757',
        quantity: 2,
        available: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }],

    /**where returned is specified true, book  has been returned otherwise book  
     * is yet to be returned */
    Borrowed: [{
        userId: 1,
        bookId: 1,
        returned: true,
        createdAt: (new Date()) - (24 * 60 * 60 * 1000), // book borrowed a day earlier
        updatedAt: new Date()

    }, {
        userId: 1,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 2,
        bookId: 2,
        returned: true,
        createdAt: (new Date()) - (24 * 60 * 60 * 1000), // book borrowed a day earlier
        updatedAt: new Date()
    }, {
        userId: 2,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 2,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 3,
        bookId: 3,
        returned: true,
        createdAt: (new Date()) - (24 * 60 * 60 * 1000), // book borrowed a day earlier
        updatedAt: new Date()

    }, {
        userId: 3,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        userId: 3,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        userId: 3,
        bookId: 4,
        createdAt: new Date(),
        updatedAt: new Date()

    }]
};