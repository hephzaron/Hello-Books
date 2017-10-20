//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

let User = require('../../server/models').User;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    before((done) => {
        User.destroy({ where: {} }).then(user => {
            if (user) { done(); }
        }).catch(err => { throw err; });
    });

    describe('/POST user', () => {
        it('it should POST user details to database', (done) => {
            let user = {
                username: 'John Doe',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 201 status code
                    // (indicating that something was "created")
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    // there should be no errors
                    should.not.exist(err);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the response shpild generate default membership value
                    res.body.should.have.property('memValue').not.be.empty;
                    // setterPassword shpould be invoked to hash password
                    res.body.should.have.property('salt').not.be.empty;
                    res.body.should.have.property('hash').not.be.empty;
                    // all attributs of user should be generated
                    res.body.should.have.all.keys('id', 'username', 'email', 'password', 'createdAt', 'updatedAt', 'salt', 'hash', 'admin', 'memValue', 'validPassword');
                    done();
                });
        }).timeout(5000);

        // Each username should be unique
        it('it should not post user credentials to database where username exist on the database', (done) => {
            let user = {
                username: 'John Doe',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 406 status code
                    // (indicating that nothing was "created")
                    res.should.have.status(406);
                    // there should be errors
                    should.exist(err);
                    // response should be a text bearing the error message
                    res.type.should.equal('text/html');
                    res.text.should.equal('username already exist');

                    // server body response should be empty
                    res.body.should.be.empty;

                    done();
                });
        }).timeout(5000);

        // User email should be unique

        it('it should not post user credentials to database where email exist on the database', (done) => {
            let user = {
                username: 'John Daniel',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 406 status code
                    // (indicating that nothing was "created")
                    res.should.have.status(406);
                    // there should be errors
                    should.exist(err);
                    // response should be a text bearing the error message
                    res.type.should.equal('text/html');
                    res.text.should.equal('This email is registered');
                    // server body response should be empty
                    res.body.should.be.empty;

                    done();
                });
        }).timeout(5000);

        // return error 406 if anuy of the user field is empty
        it('it should not post user credentials to database where any field is empty', (done) => {
            let user = {
                username: '',
                email: 'linux@gmail.com',
                password: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 406 status code
                    // (indicating that nothing was "created")
                    res.should.have.status(406);
                    // there should be errors
                    should.exist(err);
                    res.body.should.be.empty;
                    done();
                });
        }).timeout(5000);
    });

    // Integraton test for user sign in
    describe('/POST /api/users/signin', () => {
        it('it should generate token and save to cookie on successful login', (done) => {
            let user = {
                username: 'John Doe',
                password: 'synix123'
            };
            chai.request(app)
                .post('/api/users/signin')
                .send(user)
                .end((err, res) => {
                    // there should be a 200 status code
                    // (indicating that signin was successsful)
                    res.should.have.status(200);
                    res.headers.should.not.be.empty;
                    //cookie should not be empty
                    res.should.have.cookie('loginCookie').not.be.empty;
                    // user token should be sent back to user
                    res.text.should.not.be.empty;
                    // there should be no errors
                    should.not.exist(err);
                    // the response should be JSON
                    res.type.should.equal('application/json');

                    done();
                });
        }).timeout(5000);
    });
});