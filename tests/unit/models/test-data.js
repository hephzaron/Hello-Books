// Test data to be used for models

module.exports = {
    LocalUsers: [{
        username: 'Hephzibah',
        email: 'hephzaron@gmail.com',
        setPassword: 'synix123',
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        username: 'Tobi',
        email: 'tobi_daramola@yahoo.com',
        setPassword: 'synix1234+',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        username: 'Billy Jerry',
        email: 'yakoyo@yahoo.com',
        setPassword: '1980bobo',
        createdAt: new Date(),
        updatedAt: new Date()
    }],
    GoogleUsers: [{
        googleId: 1234,
        username: 'hephzibah',
        gmail: 'hephzarony@gmail.com',
        token: 'bshbuyggy177238y47h1hj'
    }, {
        googleId: 56789,
        username: 'hephzibahbah',
        gmail: 'hephzaronibah@gmail.com',
        token: 'bshbuyggy177238y4dnbf34783h-7h1hj'
    }],
    Users: [{
        email: 'tobi_daramola@yahoo.com',
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        email: 'hephzaron@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        email: 'adeyemiadekunle@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }],
    Authors: [{
        firstName: 'Nelkon',
        lastName: 'Parker',
        dateOfBirth: '1876-03-12',
        dateOfDeath: '1994-10-15',
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        firstName: 'Charles',
        lastName: 'Philip',
        dateOfBirth: '1820-03-12',
        dateOfDeath: '1900-10-15',
        createdAt: new Date(),
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
        description: 'This introduces readers to the basic of Object Oriented Programmng Language',
        ISBN: '33332-143-2457',
        quantity: 7,
        available: 7,
        documentURL: 'req.body.documentURL',
        coverPhotoURL: 'req.body.coverPhotoURL',
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        title: 'Fundamentals of Statistics for Data Scientist',
        genre_id: 3,
        description: 'Learn the fundamentals of big data analysis',
        ISBN: '12-70-894-53',
        quantity: 3,
        available: 3,
        documentURL: 'req.body.documentURL',
        coverPhotoURL: 'req.body.coverPhotoURL',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        title: 'R - the tool for data science',
        genre_id: 3,
        description: 'R language is the most widely used language for data analysis..',
        ISBN: '102-70-8934-5757',
        quantity: 5,
        available: 5,
        documentURL: 'req.body.documentURL',
        coverPhotoURL: 'req.body.coverPhotoURL',
        createdAt: new Date(),
        updatedAt: new Date()
    }],
    Owners: [{
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
    }],
    Borrowed: [{
        userId: 1,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()

    }, {
        userId: 1,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        userId: 2,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()

    }]
};