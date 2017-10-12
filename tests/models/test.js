process.env.NODE_ENV = 'test';


/*const expect = require('chai').expect;
//const response = require('./response');
const UserController = require('../../server/controllers').userController;
const qs = require('querystring');

var user = {
    username: 'hephzaron234',
    email: 'philigan@gmail.com',
    password: 'chris123'
};

var userData = qs.stringify(user);

var options = {
    body: userData
};

describe('User tests', () => {
    var userController;
    beforeEach(function() {
        userController = new UserController();
    });

    describe('When user is to be created', () => {
        it('Should be able to create user', () => {
            return userController().then((result) => {
                return expect(userController().tobeDefined());

            });

        });
    });

});*/