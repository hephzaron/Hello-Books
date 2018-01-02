//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let bookController = require('../../../server/controllers').bookController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

//import models
const Genre = require('../../../server/models').Genre;
const Authors = require('../../../server/models').Author;
const Owners = require('../../../server/models').Ownership;


//import test data sets
let authorData = require('../models/test-data').Authors;
let bookData = require('../models/test-data').Books;
let genreData = require('../models/test-data').Genres;
let ownerData = require('../models/test-data').Owners;

// drop all tables and create new ones
function dropTable() {
    db.sequelize.sync({ force: true, logging: true }).then(() => {
        //create realted data in database
        return Genre.bulkCreate(genreData).then(() => {
            Authors.bulkCreate(authorData);
        });
    });
}

describe('BOOK', () => {

    it('it should create book', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                title: bookData[0].title,
                genre_id: bookData[0].genre_id,
                description: bookData[0].description,
                ISBN: bookData[0].ISBN,
                quantity: bookData[0].quantity
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData().dataValues.title, bookData[0].title);
                assert.equal(response._getData().dataValues.genre_id, bookData[0].genre_id);
                assert.equal(response._getData().dataValues.description, bookData[0].description);
                assert.equal(response._getData().dataValues.ISBN, bookData[0].ISBN);
                assert.equal(response._getData().dataValues.quantity, bookData[0].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData().dataValues.available, bookData[0].quantity);
                assert.deepEqual(Object.keys(response._getData().dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });

        dropTable();
        setTimeout(() => { bookController.create(request, response); }, 5000);

    }).timeout(7000);

    // create a second book for test purposes
    it('it should create book a second book', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                title: bookData[1].title,
                genre_id: bookData[1].genre_id,
                description: bookData[1].description,
                ISBN: bookData[1].ISBN,
                quantity: bookData[1].quantity
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData().dataValues.title, bookData[1].title);
                assert.equal(response._getData().dataValues.genre_id, bookData[1].genre_id);
                assert.equal(response._getData().dataValues.description, bookData[1].description);
                assert.equal(response._getData().dataValues.ISBN, bookData[1].ISBN);
                assert.equal(response._getData().dataValues.quantity, bookData[1].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData().dataValues.available, bookData[1].quantity);
                assert.deepEqual(Object.keys(response._getData().dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });
        bookController.create(request, response);

    });

    // it should return error for uncreated book
    it('it should return error 404, book not found', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: { bookId: 3 },
            body: {
                description: 'change book description of book 2',
                ISBN: 'change book ISBN'
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
        bookController.update(request, response);

    });

    //this should update book record
    it('it should update book record', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: { bookId: 1 },
            body: {
                description: 'change book description of book 1',
                ISBN: 'change book ISBN'
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                Owners.create(ownerData[0]);
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().dataValues.title, bookData[0].title);
                assert.equal(response._getData().dataValues.genre_id, bookData[0].genre_id);
                assert.equal(response._getData().dataValues.description, 'change book description of book 1');
                assert.equal(response._getData().dataValues.ISBN, 'change book ISBN');
                assert.equal(response._getData().dataValues.quantity, bookData[0].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData().dataValues.available, bookData[0].quantity);
                assert.deepEqual(Object.keys(response._getData().dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'createdAt', 'updatedAt']);
                assert.deepEqual(typeof(response), 'object');
                done();
            } catch (e) { console.log(e); }
        });
        bookController.update(request, response);

    });

    // it should return all books in database
    it('it should return all books with its authors', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: {},
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().length, 2); // expect a total of two books
                //carry out sample test on one of the returned book
                assert.equal(response._getData()[0].dataValues.title, bookData[0].title);
                assert.equal(response._getData()[0].dataValues.description, 'change book description of book 1');
                assert.equal(response._getData()[0].dataValues.ISBN, 'change book ISBN');
                assert.deepEqual(Object.keys(response._getData()[0].dataValues), ['id', 'title', 'ISBN', 'description', 'Authors']);
                assert.deepEqual(typeof(response), 'object');
                return response._getData()[0].getAuthors().then(bookAuthor => { //get book and ensure it returns author 2              
                    function check(bookId) {
                        return bookAuthor.filter((object) => {
                            return object.get().id === bookId;
                        });

                    }
                    assert.equal(bookAuthor.length, 1); //Book is attached to only one author
                    assert.equal(bookAuthor[0].fullName, authorData[1].firstName + ' ' + authorData[1].lastName)
                    assert.notEqual(check(2), []); //author Id 2 should be present
                    assert.deepEqual(check(1), []); // author Id 1 should not be present
                    done();
                });
            } catch (e) { console.log(e); }

        });

        setTimeout(() => { bookController.list(request, response); }, 5000);

    }).timeout(7000);

    // user should be able to delete a book
    it('it should delete book', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: { bookId: 1 },
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.deepEqual(response._getData(), 'Book deleted');
                done();
            } catch (e) { console.log(e); }

        });
        bookController.delete(request, response);
    });
    //attept to delete book the second tie should throw an error book not found
    it('it should throw an error on second delete-Book not found', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: { bookId: 1 },
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.deepEqual(response._getData(), 'Book not found');
                done();
            } catch (e) { console.log(e); }

        });
        bookController.delete(request, response);
    });

});