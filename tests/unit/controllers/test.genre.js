//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let genreController = require('../../../server/controllers').genreController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

//import models
const Books = require('../../../server/models').Book;


//import test data sets
let bookData = require('../models/test-data').Books;
let genreData = require('../models/test-data').Genres;

// drop all tables and create new ones
function dropTable() {
    db.sequelize.sync({ force: true, logging: true });
}

describe('BOOK Genre', () => {
    //create book category
    it('it should create book category', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                name: genreData[0].name
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().dataValues.name, genreData[0].name);
                done();
            } catch (e) { console.log(e); }
        });
        dropTable();
        setTimeout(() => { genreController.create(request, response); }, 10000);
    }).timeout(20000);

    //list all book in a  category
    it('it should list all books in category COMPUTER Science', (done) => {
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
                assert.equal(response._getStatusCode(), 200); //get status code
                //ensure sent object is created
                assert.equal(response._getData()[0].dataValues.name, genreData[0].name);
                // object returned should include key-books as an attachment to book category
                assert.deepEqual(Object.keys(response._getData()[0].dataValues), ['id', 'name', 'createdAt', 'updatedAt', 'books']);
                response._getData()[0].getBooks().then(books => {
                    const genreId = response._getData()[0].dataValues.id;
                    assert.equal(books.length, 1); // Number of books in category is 1
                    //book returned should bear its category id and it's own title
                    assert.equal(books[0].dataValues.genre_id === genreId, true);
                    assert.equal(books[0].dataValues.title, bookData[0].title);
                    done();
                });
            } catch (e) { console.log(e); }
        });
        //create book for testing purpose
        Books.create(bookData[0]).then(() => {
            genreController.list(request, response);
        });
    });
});