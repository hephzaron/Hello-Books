//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
// require database
const db = require('../../../server/models');

const httpMocks = require('node-mocks-http');
const EventEmitter = require('events').EventEmitter;
const assert = require('chai').assert;

/**import models */
const Genres = require('../../../server/models').Genre;
const Books = require('../../../server/models').Book;
const Users = require('../../../server/models').User;
const Borrowed = require('../../../server/models').Borrowed;

/**import test data */
const genreData = require('../models/test-data').Genres;
const bookData = require('../models/test-data').Books;
const userData = require('../models/test-data').Users;
const borrowData = require('../models/test-data').Borrowed;

/**import bookCount middleware */
const countBook = require('../../../server/middlewares/bookCount').checkBookCount;


/**drop all tables, create new ones and insert test data **/
function createTest() {
    try {
        return db.sequelize.sync({ force: true }).then(() => {
            return Users.bulkCreate(userData).then((user) => {
                if (user) {
                    return Genres.bulkCreate(genreData).then((genre) => {
                        if (genre) {
                            return Books.bulkCreate(bookData).then((book) => {
                                if (book) {
                                    return Borrowed.bulkCreate(borrowData).then((borrow) => {
                                        if (borrow) { return borrow; }
                                    });
                                }

                            });

                        }
                    });
                }
            });

        });
    } catch (e) { console.log(e); }
}

describe('UPDATE Book quantity', () => {
    it('it should pass user if book has not been borrowed', (done) => {

        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                bookId: 2 // bookId not present in test -data
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {});

        /**Ensure book is created before calling book count middleware */
        createTest().then((book) => {
            try {
                if (book) {
                    // function should get count and pass value to next middleware
                    countBook(request, response, (count) => {
                        assert.equal(count, 0); // book has not been borrowed
                        done();
                    });
                }
            } catch (e) { console.log(e); }
        });
    }).timeout(5000);

    it('it should update book quantity in library and pass user if book is available', (done) => {
        let bookId = 3;
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                bookId: bookId //  bookId present in test-data and has a count of 2
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {});
        countBook(request, response, (book, available) => {
            return Books.findOne({ where: { id: bookId } }).then((books) => {
                let count = books.quantity;
                assert.equal(count - 2, available);
                done();
            });
        });
    }).timeout(5000);

    it('it should not pass user if book is not available i.e all has been borrowed', (done) => {
        let _created;

        let _book = {
            title: 'Advanced statistics',
            genre_id: 3,
            description: 'Learn statistics in a more advanced way',
            ISBN: '102-70-8934-5757',
            quantity: 2,
            available: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        /**test data to exhaust all bookId=4 in the library */
        let _borrowBook = [{
            userId: 2,
            bookId: 4,
            createdAt: new Date(),
            updatedAt: new Date()

        }, {
            userId: 1,
            bookId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }];
        Books.create(_book).then(book => {
            if (book) {
                return Borrowed.bulkCreate(_borrowBook).then(() => {
                    return _created = book;
                });
            }
        }).then(() => {
            let request = httpMocks.createRequest({
                method: 'POST',
                params: {
                    bookId: _created.id
                }
            });
            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    Books.findById(4).then((getBook) => {
                        if (getBook) {
                            assert.equal(getBook.available, 0);
                            assert.equal(response._getStatusCode(), 403);
                            assert.equal(response._getData(), 'Book not available');
                            done();
                        }
                    });
                } catch (e) { console.log(e); }
            });
            countBook(request, response, () => {});
        });

    }).timeout(5000);

});