//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const db = require('../../server/models');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    before(function(done) {
        this.timeout(10000);
        db.sequelize.sync({ force: true, logging: false }).then(() => {
            done();
        });
    });

    describe('/POST user', () => {
        it('it should POST user details to database', (done) => {
            let user = {
                username: 'John Doe',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                confirmPassword: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 201 status code
                    // (indicating that something was "created")
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // there should be no errors
                    should.not.exist(err);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // all attributs of user should be generated
                    res.body.should.have.all.keys('user', 'message');
                    res.body['message'].should.equal('Authentication successful');
                    done();
                });
        }).timeout(5000);

        it('it should get all registered user', (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.type.should.equal('application/json');
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body['allUsers'].should.be.a('array');
                    // Only one user have been registered on database
                    res.body['allUsers'].length.should.be.eql(1);
                    done();
                });
        }).timeout(5000);

        it('it should get a single registered user', (done) => {
            let userId = 1;
            chai.request(app)
                .get('/users/' + userId)
                .end((err, res) => {
                    res.type.should.equal('application/json');
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body['user'].should.be.a('object');
                    res.body['user'].should.have.all.keys(
                        'id',
                        'userId',
                        'username',
                        'email',
                        'admin',
                        'memValue',
                        'createdAt',
                        'updatedAt');
                    done();
                });
        }).timeout(5000);

        // Each username should be unique
        it('it should not post user credentials to database where username exist on the database', (done) => {
            let user = {
                username: 'John Doe',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                confirmPassword: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    // there should be a 406 status code
                    // (indicating that nothing was "created")
                    res.should.have.status(409);
                    res.type.should.equal('application/json');
                    res.body['message'].should.equal('username already exist');
                    done();
                });
        }).timeout(5000);

        // User email should be unique

        it('it should not post user credentials to database where email exist on the database', (done) => {
            let user = {
                username: 'John Daniel',
                email: 'pheonixera@gmail.com',
                password: 'synix123',
                confirmPassword: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    // response should be a text bearing the error message
                    res.type.should.equal('application/json');
                    res.body['message'].should.equal('This email is registered');
                    done();
                });
        }).timeout(5000);

        it('it should not post user credentials to database where any field is empty', (done) => {
            let user = {
                username: '',
                email: 'linux@gmail.com',
                password: 'synix123',
                confirmPassword: 'synix123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body['message'].should.equal('Some fields are empty');
                    done();
                });
        }).timeout(5000);
    });

    // Integraton test for user sign in
    describe('/POST /users/signin', () => {
        it('it should generate and send token', (done) => {
            let user = {
                username: 'John Doe',
                password: 'synix123'
            };
            chai.request(app)
                .post('/users/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.all.keys('message', 'user');
                    res.body['message'].should.equal('Authentication successful');
                    should.not.exist(err);
                    // the response should be JSON
                    res.type.should.equal('application/json');

                    done();
                });
        }).timeout(5000);
    });
});