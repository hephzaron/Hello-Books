/**This test case mocks the request and response objects , both are instances of the event emmitter class
 * hence the need to declare event name which is subsequently emmitted by the test suite 'node-mock-http'
 * Some other models are created as the author controller methods are dependent on it- book model,
 * while the book Model is also dependent on the Genre model.
 * Multiple objects are created to for better testing of controllers and ensure it returns the right values
 * the right way.  
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let authorController = require('../../../server/controllers').authorController;
let ownerController = require('../../../server/controllers').ownerController;
let searchController = require('../../../server/controllers').searchController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

//import models
const Genre = require('../../../server/models').Genre;
const Books = require('../../../server/models').Book;


//import test data sets
let authorData = require('../models/test-data').Authors;
let bookData = require('../models/test-data').Books;
let genreData = require('../models/test-data').Genres;

// drop all tables and create new ones
function dropTable() {
    db.sequelize.sync({ force: true, logging: false });
}

function createBook() {
    return Genre.bulkCreate(genreData).then(() => {
        Books.bulkCreate(bookData);
    });
}
describe('AUTHOR', function() {

    it('it should create author object', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                firstName: authorData[0].firstName,
                lastName: authorData[0].lastName,
                dateOfBirth: authorData[0].dateOfBirth,
                dateOfDeath: authorData[0].dateOfDeath
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], `${authorData[0].firstName} ${authorData[0].lastName}, successfully added`);
                assert.equal(response._getData()['author'].dataValues.firstName, authorData[0].firstName);
                assert.equal(response._getData()['author'].dataValues.lastName, authorData[0].lastName);
                assert.deepEqual(Object.keys(response._getData()['author'].dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });

        dropTable();
        setTimeout(() => { authorController.create(request, response); }, 10000);
    }).timeout(20000);

    //It should create another author

    it('it should create second author object', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                firstName: authorData[1].firstName,
                lastName: authorData[1].lastName,
                dateOfBirth: authorData[1].dateOfBirth,
                dateOfDeath: authorData[1].dateOfDeath
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], `${authorData[1].firstName} ${authorData[1].lastName}, successfully added`);
                assert.equal(response._getData()['author'].dataValues.firstName, authorData[1].firstName);
                assert.equal(response._getData()['author'].dataValues.lastName, authorData[1].lastName);
                assert.deepEqual(Object.keys(response._getData()['author'].dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });
        setTimeout(() => { authorController.create(request, response); }, 10000);
    }).timeout(20000);

});

// A different test suite to allocate book to author

describe('OWNERS', () => {
    before(() => {
        createBook();
    });
    it('it should allocate book to author', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                authorId: 1,
                bookId: 1
            } //link book with id =1 and author with id = 1 to test controller
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], 'Book have been assigned successfully');
                assert.equal(response._getData()['authorBook'].dataValues.authorId, 1);
                assert.equal(response._getData()['authorBook'].dataValues.bookId, 1);
                assert.deepEqual(Object.keys(response._getData()['authorBook'].dataValues), ['ownerId', 'authorId', 'bookId', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });

        setTimeout(() => { ownerController.create(request, response); }, 10000);

    }).timeout(20000);

    // allocate second book to author
    it('it should allocate second book to author', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                authorId: 1,
                bookId: 2
            } //link book with id =1 and author with id = 1 to test controller
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], 'Book have been assigned successfully');
                assert.equal(response._getData()['authorBook'].dataValues.authorId, 1);
                assert.equal(response._getData()['authorBook'].dataValues.bookId, 2);
                assert.deepEqual(Object.keys(response._getData()['authorBook'].dataValues), ['ownerId', 'authorId', 'bookId', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });

        setTimeout(() => { ownerController.create(request, response); }, 10000);

    }).timeout(20000);

});

describe('FETCH Author Books', () => {
    it('it should get all books written by same author', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET'
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                //return all releveant author details and books written
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getData()['authors'].length, 2);
                assert.deepEqual(Object.keys(response._getData().authors[1].dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'createdAt', 'updatedAt', 'Books']);
                assert.equal(response._getStatusMessage(), 'OK');
                //  console.log(response._getData());
                return response._getData().authors[0].getBooks().then(authorBook => { //get list of books attached to author 1
                    //function to check for book with id 3 for author 1
                    let check = authorBook.filter((object) => {
                        return object.get().id === 3;
                    });
                    assert.equal(authorBook.length, 2); //author is only attached to two books
                    assert.deepEqual(check, []); //book Id 3 should not be presentconsole.log(authorBook);
                    done();
                });

            } catch (e) { console.log(e); }
        });

        setTimeout(() => { authorController.getAuthors(request, response); }, 5000);
    }).timeout(7000);

    //Retrieve all books by a single author
    it('it should retreive book by a single author', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: {
                authorId: 1
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().author[0].dataValues.id, 1); //ensure its author with id 1 thats returned.
                assert.deepEqual(Object.keys(response._getData().author[0].dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'createdAt', 'updatedAt', 'Books']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                return response._getData().author[0].getBooks().then(authorBook => { //get list of books attached to author 1
                    //function to check that only author books whre returned
                    function check(bookId) {
                        return authorBook.filter((object) => {
                            return object.get().id === bookId;
                        });

                    }
                    assert.equal(authorBook.length, 2); //author is only attached to two books
                    assert.notEqual(check(1), []); //book Id 1 should be present
                    assert.notEqual(check(2), []); //book Id 2 should be present
                    assert.deepEqual(check(3), []); // book Id 3 should not be present
                    done();
                });
            } catch (e) { console.log(e); }
        });
        setTimeout(() => { authorController.getAuthors(request, response); }, 5000);
    }).timeout(7000);

    it('it should search for author', (done) => {
        let word = 'nelkon'
        let request = httpMocks.createRequest({
            method: 'GET',
            query: {
                q: word,
                type: 'authors'
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData()['message'], `Author found`);
                assert.equal(response._getData()['author'].length, 1);
                assert.equal(/nelkon/i.test(response._getData().author[0].dataValues.firstName), true);
                done();
            } catch (e) {
                console.log(e)
            }
        });
        searchController.getSearchResult(request, response);
    });

    //this should update author record
    it('it should update author record', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: { authorId: 1 },
            body: {
                firstName: 'Michael'
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData()['message'], `Michael ${authorData[0].lastName} record have been updated`)
                assert.equal(response._getData()['updatedAuthor'].dataValues.firstName, 'Michael');
                assert.equal(response._getData()['updatedAuthor'].dataValues.lastName, authorData[0].lastName);
                assert.deepEqual(Object.keys(response._getData()['updatedAuthor'].dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'createdAt', 'updatedAt']);
                assert.deepEqual(typeof(response), 'object');
                done();
            } catch (e) { console.log(e); }
        });
        authorController.update(request, response);
    });

    // it should delete author record
    it('it should delete author', (done) => {
        let request = httpMocks.createRequest({
            method: 'DELETE',
            params: { authorId: 1 },
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.deepEqual(response._getData()['message'], 'Author removed successfully');
                done();
            } catch (e) { console.log(e); }

        });
        authorController.delete(request, response);
    });
    //attept to delete book the second time should throw an error author not found
    it('it should throw an error on second delete-Author not found', (done) => {
        let request = httpMocks.createRequest({
            method: 'DELETE',
            params: { authorId: 1 },
            body: {}
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 404);
                assert.equal(response._getStatusMessage(), 'OK');
                assert.deepEqual(response._getData()['message'], 'Author not found');
                done();
            } catch (e) { console.log(e); }

        });
        authorController.delete(request, response);
    });

});