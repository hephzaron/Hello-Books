/**This test suite run tests on the membership value function to check that
 *  the right memebership value is alloted to users depending how long they have been a member 
 * how frequent they borrow and return books*/

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

/**import test data sets */
const genreData = require('../models/mem-value-data').Genres;
const bookData = require('../models/mem-value-data').Books;
const userData = require('../models/mem-value-data').Users;
const borrowData = require('../models/mem-value-data').Borrowed;

/**import membership value middleware */
const membershipValue = require('../../../server/middlewares').membershipVal;

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

describe('ALLOCATE MEMBERSHIP Value', () => {
    it('it should set membership value -platinum for user-1 and restrict user to maximum of 1 unreturned book', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                userId: 1
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {});
        createTest().then((success) => {
            if (success) {
                membershipValue.memberVal(request, response, (borrowCount, memVal) => {
                    try {
                        assert.equal(borrowCount, 1);
                        assert.equal(memVal, 'platinum');
                        done();
                    } catch (e) { console.log(e); }
                });
            }
        });

    }).timeout(5000);

    it('it should set membership value -silver for user-2 and restrict user to maximum of 2 unreturned book', (done) => {

        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                userId: 2
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {});
        membershipValue.memberVal(request, response, (borrowCount, memVal) => {
            try {
                Users.findById(2).then((users) => {
                    if (users) {
                        assert.equal(users.memValue, 'silver');
                        assert.equal(borrowCount, 2);
                        assert.equal(memVal, 'silver');
                        done();
                    }
                });
            } catch (e) { console.log(e); }
        });
    }).timeout(5000);

    it('it should set membership value -gold for user-3 and restrict user to maximum of 3 unreturned book', (done) => {

        let request = httpMocks.createRequest({
            method: 'POST',
            params: {
                userId: 3
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        response.on('send', () => {});
        membershipValue.memberVal(request, response, (borrowCount, memVal) => {
            try {
                assert.equal(borrowCount, 3);
                assert.equal(memVal, 'gold');
                done();
            } catch (e) { console.log(e); }
        });
    }).timeout(5000);
});