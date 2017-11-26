let setTimeout = require('timers').setTimeout;

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
// require database
const db = require('../../../server/models');
let authorController = require('../../../server/controllers').authorController;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;



let authorData = require('../models/test-data').Authors;

// drop all tables and create new ones
//db.sequelize.sync({ force: true, logging: true });
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
                assert.equal(response._getStatusCode(), 200);
                assert.equal(response._getData().dataValues.firstName, authorData[0].firstName);
                assert.equal(response._getData().dataValues.lastName, authorData[0].lastName);
                assert.deepEqual(Object.keys(response._getData().dataValues), ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateOfDeath', 'updatedAt', 'createdAt']);
                assert.deepEqual(typeof(response), 'object');
                assert.equal(response._getStatusMessage(), 'OK');
                done();
            } catch (e) { console.log(e); }
        });
        authorController.create(request, response);


    }).timeout(5000);
});