/**This test user authentication and authorisation middleware, it modify tokens and test against middleware
 * to ensure only authenticated and authorised user can access route. It also check to ensure only
 * an admin personnel is authorise to access admin protected route
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'iloveprogramming';
// require database
const db = require('../../../server/models');
let auth = require('../../../server/middlewares').authorize;

let httpMocks = require('node-mocks-http');
let EventEmitter = require('events').EventEmitter;
let assert = require('chai').assert;
// import model and test data
const LocalUser = require('../../../server/models').LocalUser;
const localUsers = require('../models/test-data').LocalUsers;
const User = require('../../../server/models').User;

// drop all tables and create new ones and insert test data 
function createTest() {
    return db.sequelize.sync({ force: true, logging: false }).then(() => {
        return LocalUser.create(localUsers[0]).then((localuser) => {
            return User.create({
                userId: localuser.uuid,
                username: localuser.username,
                email: localuser.email
            }).then(user => user);
        });
    });
}

/**Create function to manipulate token to ensure only authorised users are passed */
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
    let token; // make generated token accessible to all aspects of code.
    /** test to ensure token is generated and sent as a cookie to user once user is found in the database*/
    it('it should generate JWT, send to user ', (done) => {
        let request = httpMocks.createRequest({
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/5.0'
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
                console.log(response._getData());
                token = response._getData().user['token'];
                assert.exists(response._getData().user['token']);
                assert.equal(response._getStatusCode(), 200);
                done();

            } catch (e) { console.log(e); }
        });
        /**persist test data to database before calling authorization middleware function */
        createTest().then((created) => {
            if (created) {
                auth.generateJWT(request, response);
            }
        });

    }).timeout(5000);

    describe('VERIFY Token', () => {
        /**Expose token claims throughout test suite to serve as default parameters */
        let expires = Math.floor(new Date().getTime() / 1000) + (1 * 60 * 60); //token expires in 1hr
        let username = localUsers[1].username; // user 1 and 0 was persisted to database
        let admin = false; // set admin value to false

        /**Arbitrary user should not be authorised if user cannot be found in database */
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

            /**generate token for a user that does not exist in database */
            let tamperToken = new TamperToken(expires, username, admin, req, secret); //Create new TamperToken Object
            let token = tamperToken.generateToken();
            let userToken;
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined); // it should not return user credentials
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;
            });
        });

        /**test to check for expired token */
        it('it should not authorize user for expired token', (done) => {
            let expires = Math.floor(new Date().getTime() / 1000) - (5 * 60); //token expired 5minutes ago
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

            /**create token that expired 5 minutes ago and pass into function */
            let tamperToken = new TamperToken(expires, username, admin, req, secret); //Create new TamperToken Object
            let token = tamperToken.generateToken();
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined); //user credentials should not be returned
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;
            });

        });
        /**test to ensure user is not authorised if signnature has been stripped */
        it('it should not authorize user if token signature is stripped', (done) => {
            let userToken;
            let stripSignature = token.split('.'); //generate an array that contains the header, payload and secret
            let unsignedToken = stripSignature[0] + '.' + stripSignature[1]; //concatenate the header and payload
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': unsignedToken
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;

            });

        });

        /**with signature intact, user should not be authorised if payload has been tampered with */
        it('it should not authorize user  if user credentials have been tampered with', (done) => {
            let userToken;
            let tamper = token.split('.');
            let tamperToken = tamper[0] + '.' + tamper[1].slice(-24, -1) + '.' + tamper[2];
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': tamperToken
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;

            });
        });

        /**it should not authorize user for wrong signature or secret */
        it('it should not authorize user  with wrong signature', (done) => {
            let userToken;
            let tamper = token.split('.');
            let tamperTokenSignature = tamper[0] + '.' + tamper[1] + '.' + tamper[2].slice(3);

            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': tamperTokenSignature
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });
            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;

            });
        });
        /**it should not authorise user if no token is supplied */
        it('it should not authorize user if token is not provided', (done) => {
            let userToken;
            let token = null;
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 401);
                    assert.equal(response._getData()['message'], 'Token invalid or expired-user not found');
                    assert.equal(userToken, undefined);
                    done();
                } catch (e) { console.log(e); }
            });

            auth.verifyUser(request, response, (_decoded) => {
                let userToken = _decoded;
                return userToken;
            });
        });

        /**user with valid token should be authorised */
        it('it should authorize user for valid token', (done) => {

            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {});

            auth.verifyUser(request, response, () => {
                done(); //done is called when next() is called in middleware
            });

        });
    });

    describe('PROTECT Admin route', () => {
        it('it should restrict non-admin from accessing admin protected route', (done) => {
            let userAdmin;
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });
            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {
                try {
                    assert.equal(response._getStatusCode(), 403); //user not authorised
                    assert.equal(response._getData()['message'], 'You are not authorized to perform this action');
                    assert.equal(userAdmin, undefined);
                    done();
                } catch (e) { console.log(e); }

            });
            auth.adminProtect(request, response, (user) => {
                let userAdmin = user;
                return userAdmin;
            });

        });
        it('it should allow admin to access admin protected route', (done) => {
            /**generate another token and set admin to be true */

            let expires = Math.floor(new Date().getTime() / 1000) + (5 * 60); //token should expire in 5minutes ago
            let username = localUsers[0].username;
            let admin = true;
            let req = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0'
                },
                body: {
                    username: username
                }
            });

            /**create token that expired 5 minutes ago and pass into function */
            let tamperToken = new TamperToken(expires, username, admin, req, secret); //Create new TamperToken Object
            let token = tamperToken.generateToken();
            let request = httpMocks.createRequest({
                method: 'POST',
                headers: {
                    'user-agent': 'Mozilla/5.0',
                    'x-access-token': token
                }
            });

            let response = httpMocks.createResponse({
                eventEmitter: EventEmitter
            });
            response.on('send', () => {});
            auth.adminProtect(request, response, () => {
                done(); //done is called when next() is called in middleware
            });

        });

    });
});