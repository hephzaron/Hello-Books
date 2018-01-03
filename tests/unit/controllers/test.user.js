// set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let userController = require('../../../server/controllers').userController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

// import models
const Genre = require('../../../server/models').Genre;
const Book = require('../../../server/models').Book;
const Borrowed = require('../../../server/models').Borrowed;
const User = require('../../../server/models').User;

// import test data sets
let bookData = require('../models/test-data').Books;
let borrowData = require('../models/test-data').Borrowed;
let localUser = require('../models/test-data').LocalUsers;
let userData = require('../models/test-data').Users;
let genreData = require('../models/test-data').Genres;

// drop all tables and create new ones
function dropTable() {
    db.sequelize.sync({ force: true, logging: true });
}

function createTest() {
    db.sequelize.sync({ force: true }).then(() => {
        User.bulkCreate(userData).then(() => {
            Genre.bulkCreate(genreData).then(() => {
                Book.bulkCreate(bookData).then(() => {
                    Borrowed.bulkCreate(borrowData);
                });
            });
        });
    });
}

describe('REGISTER User', () => {
    it('it should persist user data to the local and user table', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                username: localUser[0].username,
                email: localUser[0].email,
                password: localUser[0].setPassword
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData().dataValues.username, localUser[0].username);
                assert.equal(response._getData().dataValues.email, localUser[0].email);
                assert.isNotEmpty(response._getData().dataValues.salt);
                assert.isNotEmpty(response._getData().dataValues.hash);
                done();
            } catch (e) { console.log(e); }
        });

        dropTable();
        setTimeout(() => {
            userController.create(request, response);
        }, 10000);
    }).timeout(20000);
});

describe('SIGN-IN User', () => {
    it('it should not sign in user for incorrect username', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                username: localUser[1].username,
                password: localUser[0].setPassword
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getData(), 'incorrect username or password');
                done();
            } catch (e) { console.log(e); }
        });
        userController.signIn(request, response, () => {}); // next() is not called
    });

    it('it should not sign in user for incorrect password', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                username: localUser[0].username,
                password: localUser[1].setPassword
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getData(), 'incorrect username or password');
                done();
            } catch (e) { console.log(e); }
        });
        userController.signIn(request, response, () => {}); // next() is not called
    });
    // where password field is empty request for it and not sign in user
    it('it should request for password if empty and not sign in user', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                username: localUser[0].username
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getData(), 'incorrect username or password');
                done();
            } catch (e) { console.log(e); }
        });
        userController.signIn(request, response, () => {}); // next() is not called
    });

    // it should sign in user with correct username and password and save to the 
    // general user tables and local login table and allows user to proceed
    it('it should sign in user with correct credentials', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                username: localUser[0].username,
                password: localUser[0].setPassword
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {});

        //callback should run as next() is called
        userController.signIn(request, response, (user) => {
            assert.equal(user, null);
            done();
        });
    });
});

describe('FETCH User Books', () => {
    it('it should fetch all users and book borrowed', (done) => {

        let request = httpMocks.createRequest({
            method: 'GET',
            params: {},
            body: {}

        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        function loop(id) {
            return borrowData.filter(function(data) {
                return data.userId === id;
            });
        }

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData().length, userData.length)
                response._getData().map((book) => {
                    return book.getBooks().then(function(userBooks) {
                        let userId = book.id;
                        assert.equal(userBooks.length, loop(userId).length);
                        done();
                    });
                });
            } catch (e) { console.log(e); }
        });

        createTest();

        setTimeout(() => {
            userController.userBooks(request, response);
        }, 10000);
    }).timeout(30000);

    it('it should retrieve a user book', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: { userId: 1 },
            query: { returned: false },
            body: {}

        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData().id, 1); // ensure user 1 is returned
                response._getData().getBooks().then(books => {
                    assert.equal(books.length, 2); // return two books unreturned by user
                    done();
                });
            } catch (e) { console.log(e); }
        });
        userController.retrieveOne(request, response);
    });
});