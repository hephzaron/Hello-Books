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
db.sequelize.sync({ force: true, logging: true });
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
            console.log(response._getStatusCode());
        });
        setTimeout(function() {
            authorController.create(request, response);
            done();
        }, 5000);
    }).timeout(5000);
});