//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

// require database
const db = require('../../../server/models');
let bookController = require('../../../server/controllers').bookController;
let searchController = require('../../../server/controllers').searchController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

//import models
const Genre = require('../../../server/models').Genre;
const Authors = require('../../../server/models').Author;
const Books = require('../../../server/models').Book;
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
            Authors.bulkCreate(authorData)
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
                documentURL: bookData[0].documentURL,
                coverPhotoURL: bookData[0].coverPhotoURL,
                quantity: bookData[0].quantity
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], `${bookData[0].title} have been added to library`);
                assert.equal(response._getData()['book'].dataValues.title, bookData[0].title);
                assert.equal(response._getData()['book'].dataValues.genre_id, bookData[0].genre_id);
                assert.equal(response._getData()['book'].dataValues.description, bookData[0].description);
                assert.equal(response._getData()['book'].dataValues.ISBN, bookData[0].ISBN);
                assert.equal(response._getData()['book'].dataValues.quantity, bookData[0].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData()['book'].dataValues.available, bookData[0].quantity);
                assert.deepEqual(Object.keys(response._getData()['book'].dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'documentURL', 'coverPhotoURL', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });

        dropTable();
        setTimeout(() => { bookController.create(request, response); }, 5000);

    }).timeout(7000);

    // create a second book for test purposes
    it('it should create a second book', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {},
            body: {
                title: bookData[1].title,
                genre_id: bookData[1].genre_id,
                description: bookData[1].description,
                ISBN: bookData[1].ISBN,
                quantity: bookData[1].quantity,
                documentURL: bookData[1].documentURL,
                coverPhotoURL: bookData[1].coverPhotoURL,
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 201);
                assert.equal(response._getData()['message'], `${bookData[1].title} have been added to library`);
                assert.equal(response._getData()['book'].dataValues.title, bookData[1].title);
                assert.equal(response._getData()['book'].dataValues.genre_id, bookData[1].genre_id);
                assert.equal(response._getData()['book'].dataValues.description, bookData[1].description);
                assert.equal(response._getData()['book'].dataValues.ISBN, bookData[1].ISBN);
                assert.equal(response._getData()['book'].dataValues.quantity, bookData[1].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData()['book'].dataValues.available, bookData[1].quantity);
                assert.deepEqual(Object.keys(response._getData()['book'].dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'documentURL', 'coverPhotoURL', 'updatedAt', 'createdAt']);
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
                assert.equal(response._getData()['message'], `${bookData[0].title} record have been updated`)
                assert.equal(response._getData()['updatedBook'].dataValues.title, bookData[0].title);
                assert.equal(response._getData()['updatedBook'].dataValues.genre_id, bookData[0].genre_id);
                assert.equal(response._getData()['updatedBook'].dataValues.description, 'change book description of book 1');
                assert.equal(response._getData()['updatedBook'].dataValues.ISBN, 'change book ISBN');
                assert.equal(response._getData()['updatedBook'].dataValues.quantity, bookData[0].quantity);
                //ensure no of books available is initialised to the quantity posted
                assert.equal(response._getData()['updatedBook'].dataValues.available, bookData[0].quantity);
                assert.deepEqual(Object.keys(response._getData()['updatedBook'].dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'documentURL', 'coverPhotoURL', 'createdAt', 'updatedAt']);
                assert.deepEqual(typeof(response), 'object');
                done();
            } catch (e) { console.log(e); }
        });
        bookController.update(request, response);

    });

    // it should return all books in database
    it('it should get all books with its authors', (done) => {
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
                assert.equal(response._getData()['books'].length, 2); // expect a total of two books
                //carry out sample test on one of the returned book
                assert.equal(response._getData().books[0].dataValues.title, bookData[0].title);
                assert.equal(response._getData().books[0].dataValues.description, 'change book description of book 1');
                assert.equal(response._getData().books[0].dataValues.ISBN, 'change book ISBN');
                assert.deepEqual(Object.keys(response._getData().books[0].dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'documentURL', 'coverPhotoURL', 'createdAt', 'updatedAt', 'Authors']);
                assert.deepEqual(typeof(response), 'object');
                return response._getData().books[0].getAuthors().then(bookAuthor => { //get book and ensure it returns author 2              
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

        setTimeout(() => { bookController.getBooks(request, response); }, 5000);

    }).timeout(7000);

    //Retrieve a single book and contributing authors
    it('it should get a single book and contributing authors', (done) => {
        let request = httpMocks.createRequest({
            method: 'GET',
            params: {
                bookId: 1
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().book[0].dataValues.id, 1); //ensure its book with id 3 thats returned.
                assert.deepEqual(Object.keys(response._getData().book[0].dataValues), ['id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'documentURL', 'coverPhotoURL', 'createdAt', 'updatedAt', 'Authors']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                return response._getData().book[0].getAuthors().then(author => { //get list of authors attached to book 3
                    //function to check that only contributing authors where returned
                    function check(authorId) {
                        return author.filter((object) => {
                            return object.get().id === authorId;
                        });

                    }
                    assert.equal(author.length, 1); //book has one contributing authors
                    assert.deepEqual(check(1), []); //author Id 1 should not be present
                    assert.notEqual(check(2), []); //author Id 2 should be present
                    assert.deepEqual(check(3), []); //author Id 3 should not be present
                    done();
                });
            } catch (e) { console.log(e); }
        });
        setTimeout(() => { bookController.getBooks(request, response); }, 5000);
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
                assert.deepEqual(response._getData()['message'], 'Book have been successfully deleted');
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
                assert.deepEqual(response._getData()['message'], 'Book not found');
                done();
            } catch (e) { console.log(e); }

        });
        bookController.delete(request, response);
    });

    it('it should search for book', (done) => {
        let word = 'data'
        let request = httpMocks.createRequest({
            method: 'GET',
            query: {
                q: word,
                type: 'books'
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData()['message'], `Book found`);
                assert.equal(response._getData()['books'].length, 2);
                assert.equal(/data/i.test(response._getData().books[0].dataValues.title), true);
                assert.equal(/data/i.test(response._getData().books[1].dataValues.title), true);
                done();
            } catch (e) {
                console.log(e)
            }
        });
        Books.create(bookData[2]).then(() => {
            searchController.getSearchResult(request, response);
        })
    });

    it('it should get first page of paginated searched result with limit 1', (done) => {
        let word = 'data'
        let request = httpMocks.createRequest({
            method: 'GET',
            query: {
                q: word,
                type: 'books',
                count: 1,
                page: 1
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData()['message'], `Book found`);
                assert.equal(response._getData()['book'].length, 1);
                assert.equal(/data/i.test(response._getData().book[0].dataValues.title), true);
                //ascertain first matched record was returned
                assert.equal(response._getData().book[0].dataValues.title, bookData[1].title)
                assert.equal(response._getData().book[1], undefined);
                done();
            } catch (e) {
                console.log(e)
            }
        });
        searchController.getSearchResult(request, response);
    });

    it('it should get second page of paginated searched result with limit 1', (done) => {
        let word = 'data'
        let request = httpMocks.createRequest({
            method: 'GET',
            query: {
                q: word,
                type: 'books',
                count: 1,
                page: 2
            }
        });
        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData()['message'], `Book found`);
                assert.equal(response._getData()['book'].length, 1);
                assert.equal(/data/i.test(response._getData().book[0].dataValues.title), true);
                //ascertain second matched record was returned
                assert.equal(response._getData().book[0].dataValues.title, bookData[2].title)
                assert.equal(response._getData().book[1], undefined);
                done();
            } catch (e) {
                console.log(e)
            }
        });
        searchController.getSearchResult(request, response);
    });

});