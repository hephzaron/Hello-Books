//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';
const async = require('async-waterfall');
// require database
const db = require('../../../server/models');
let auth = require('../../../server/middlewares').authorize;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;

let setTimeout = require('timers').setTimeout;

const LocalUser = require('../../../server/models').LocalUser;
const localUsers = require('../models/test-data').LocalUsers;

// drop all tables and create new ones

function createTest() {
    return db.sequelize.sync({ force: true, logging: false }).then(() => {
        return LocalUser.create(localUsers[0]).then((localuser) => {
            return localuser;
        });
    });
}


//Function to modify token to ensure authorisation is properly carried out
function TamperToken(expires, username, admin, req, _secret) {

    let request = req;
    const now = new Date().getTime();
    let secret = _secret;
    let payload = {
        auth: now,
        agent: request.headers['user-agent'],
        exp: expires,
        username: username,
        admin: admin
    };

    //public method
    this.generateToken = () => {
        if (_secret) {
            //if secret exists generate signed token
            return jwt.sign(payload, secret, { algorithm: 'HS256' });
        }
        if (!_secret) {
            //generate unsigned token for unaavailable secret
            return jwt.sign(payload, { algorithm: 'HS256' });
        }
    };
}


describe('PERFORM USER Authorization', () => {


    let token;

    it('it should generate JWT, send to user and create a cookie', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/5.0',
                'authorization': token
            },
            body: {
                username: localUsers[0].username
            }
        });

        let response = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });
        response.on('send', () => {
            try {
                token = response._getData(); // retrieve user token to be used for further test
                assert.equal(response._getData(), response.cookies.loginCookie.value);
                assert.equal(response._getStatusCode(), 200);
                done();

            } catch (e) { console.log(e); }
        });
        createTest().then((created) => {
            if (created) {
                auth.generateJWT(request, response);
            }
        });

    }).timeout(5000);

    describe('VERIFY Token', () => {
        let expires = Math.floor(new Date().getTime() / 1000) + 1 * 60 * 60; //token expires in 1hr
        let username = localUsers[1].username;
        let admin = false;

        it('it should not authorize user if user credentials does not exist in database', (done) => {
            let req = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0'
                },
                body: {
                    username: username
                }
            });

            let tamperToken = new TamperToken(expires, username, admin, req, secret) //Create new TamperToken Object
            let token = tamperToken.generateToken();
            let userToken;
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 404);
                    assert.equal(response._getData(), 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;
            });
        });
        it('it should not authorize user for expired token', (done) => {
            let expires = Math.floor(new Date().getTime() / 1000) - 5 * 60; //token expired 5minutes ago
            let username = localUsers[0].username;
            let userToken;
            let req = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0'
                },
                body: {
                    username: username
                }
            });

            let tamperToken = new TamperToken(expires, username, admin, req, secret); //Create new TamperToken Object
            let token = tamperToken.generateToken();
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData(), 'jwt expired');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;
            });

        });

        it('it should not authorize user if token signature is stripped', (done) => {
            let userToken;
            let stripSignature = token.split('.');
            let unsignedToken = stripSignature[0] + '.' + stripSignature[1];
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': unsignedToken
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData(), 'jwt malformed');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;

            });

        });


        it('it should not authorize user  if user credentials have been tampered with', (done) => {
            let userToken;
            let tamper = token.split('.');
            let tamperToken = tamper[0] + '.' + tamper[1].slice(-24, -1) + '.' + tamper[2];
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': tamperToken
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData(), 'Unexpected token � in JSON at position 0');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;

            });
        });

        ////

        it('it should not authorize user  with wrong signature', (done) => {
            let userToken;
            let tamper = token.split('.');
            let tamperTokenSignature = tamper[0] + '.' + tamper[1] + '.' + tamper[2].slice(3);

            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': tamperTokenSignature
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData(), 'invalid signature');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;

            });
        });

        it('it should not authorize user if token is not provided', (done) => {
            let userToken;
            let token = null;
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData(), 'jwt must be provided');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });

            auth.verifyUser(request, response, (_decoded) => {
                return userToken = _decoded;
            });
        });


        it('it should authorize user for valid token', (done) => {
            let now = Math.floor(new Date().getTime() / 1000);

            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'authorization': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {});

            auth.verifyUser(request, response, (_decoded) => {
                assert.equal(_decoded.username, localUsers[0].username);
                assert.equal(_decoded.exp > now, true);
                done();
            });

        });
    });
});