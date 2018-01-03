//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let borrowController = require('../../../server/controllers').borrowController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

//import models
const Genre = require('../../../server/models').Genre;
const Books = require('../../../server/models').Book;
const Users = require('../../../server/models').User;
const Authors = require('../../../server/models').Author;
const Owners = require('../../../server/models').Ownership;


//import test data sets
let bookData = require('../models/test-data').Books;
let genreData = require('../models/test-data').Genres;
let borrowData = require('../models/test-data').Borrowed;
let userData = require('../models/test-data').Users;
let authorData = require('../models/test-data').Authors;
let ownerData = require('../models/test-data').Owners;

// drop all tables and create new ones
function dropTable() {
    return db.sequelize.sync({ force: true, logging: false }).then(() => {
        //create realted data in database
        return Genre.bulkCreate(genreData).then(() => {
            Users.bulkCreate(userData);
            return Books.bulkCreate(bookData).then(() => {
                return Authors.bulkCreate(authorData).then(() => {
                    return Owners.bulkCreate(ownerData);
                });
            });

        });
    });
}

describe('BORROW Books', () => {
    it('it should borrow book', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: {
                userId: borrowData[0].userId,
                bookId: borrowData[0].bookId
            },
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.equal(response._getData().dataValues.userId, borrowData[0].userId);
                assert.equal(response._getData().dataValues.bookId, borrowData[0].bookId);
                assert.equal(response._getData().dataValues.returned, false);
                done();
            } catch (e) { console.log(e); }
        });
        dropTable().then(() => {
            borrowController.create(request, response);
        });
    }).timeout(60000);

    //user should be able to return books
    it('it should return books', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                userId: borrowData[0].userId,
                bookId: borrowData[0].bookId
            },
            body: {
                returned: true
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.equal(response._getData().dataValues.userId, borrowData[0].userId);
                assert.equal(response._getData().dataValues.bookId, borrowData[0].bookId);
                assert.equal(response._getData().dataValues.returned, true);
                done();
            } catch (e) { console.log(e); }
        });
        borrowController.update(request, response);
    });
    // it should return book not found where no record of book borrowed by user
    it('it should return BOOK NOT FOUND for an attempt to return book not borrowed', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                userId: borrowData[0].userId,
                bookId: borrowData[2].bookId
            },
            body: {
                returned: true
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.deepEqual(response._getData(), { message: 'Book Not Found' });
                done();
            } catch (e) { console.log(e); }
        });
        borrowController.update(request, response);
    });
});