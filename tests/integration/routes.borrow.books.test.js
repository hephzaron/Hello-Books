//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const db = require('../../server/models');

// import book model
const Genre = require('../../server/models').Genre;
const Book = require('../../server/models').Book;

//import needed data for testing
const genreData = require('../unit/models/test-data').Genres;
const bookData = require('../unit/models/test-data').Books;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('REGISTER USER', () => {
    before((done) => {
        db.sequelize.sync({ force: true, logging: false }).then(() => {
            Genre.bulkCreate(genreData).then(() => {
                Book.bulkCreate(bookData).then((book) => {
                    if (book) {
                        done();
                    }
                });
            });
        });
    });

    let user = {
        username: 'Philip',
        email: 'philip2017@gmail.com',
        password: 'phil17',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    it('it should register user', (done) => {
        chai.request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.type.should.equal('application/json');
                res.body.should.have.property('salt').not.be.empty;
                res.body.should.have.property('hash').not.be.empty;
                done();

            });
    });
});
//sign in a user to test the protected routes from seeders entries
describe('USER SHOULD LOGIN TO BORROW BOOK', () => {

    it('it should signin user and generate token to access routes', (done) => {
        let agent = chai.request.agent(app);

        agent.post('/api/users/signin')
            .send({ username: 'Philip', password: 'phil17' })
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.have.property('token').not.be.empty;

                let token = res.body.token;
                let loginCookie = res.headers['set-cookie'];

                // get user id from login
                let userId = res.body.body.id;


                describe('BORROW AND RETURN BOOKS', () => {
                    it('it should borrrow books', (done) => {

                        //User with userId borrows two book with id equals 1 and id equals 2

                        let bookId = 1;
                        agent.post('/api/users/' + userId + '/books/' + bookId)
                            .set({ 'token': token }, { 'cookies': loginCookie })
                            .end((err, res) => {
                                // it should be successful
                                res.status.should.equals(201);
                                res.type.should.equal('application/json');
                                res.body.should.have.property('returned').to.be.equal(false);
                                res.body.should.have.all.keys('borrowId', 'userId', 'bookId', 'createdAt', 'updatedAt', 'returned');

                                //....borrow second book with id equals 2
                                let bookId = 2;
                                agent.post('/api/users/' + userId + '/books/' + bookId)
                                    .set({ 'token': token }, { 'cookies': loginCookie })
                                    .end((err, res) => {
                                        // it should be successful
                                        res.status.should.equals(201);
                                        res.type.should.equal('application/json');
                                        res.body.should.have.property('returned').to.be.equal(false);
                                        res.body.should.have.all.keys('borrowId', 'userId', 'bookId', 'createdAt', 'updatedAt', 'returned');
                                        //borrow second book with id equals 2
                                        done();

                                    });
                            });

                    });

                    it('it should get unreturned book by a user before return of any', (done) => {
                        agent.get('/api/users/' + userId + '/books')
                            .query('returned=false')
                            .end((err, res) => {

                                res.should.have.status(201);
                                should.not.exist(err);
                                res.type.should.equal('application/json');
                                res.body.should.be.a('object');
                                res.body.Books.should.be.a('array');
                                //Two of the books yet to be returned
                                res.body.Books.length.should.be.eql(2);
                                done();
                            });

                    });

                    it('it should return books borrowed by user', (done) => {

                        //returned properties to true for user to return book
                        let book = {
                            returned: true
                        };
                        let bookId = 1;
                        agent.put('/api/users/' + userId + '/books/' + bookId)
                            .send(book)
                            .end((err, res) => {
                                res.should.have.status(200);
                                should.not.exist(err);
                                res.type.should.equal('application/json');
                                res.body.should.be.a('object');
                                res.body.should.have.property('returned').to.be.equal(true);
                                done();

                            });

                    });
                    it('it should get unreturned book by a user', (done) => {
                        agent.get('/api/users/' + userId + '/books')
                            .query('returned=false')
                            .end((err, res) => {

                                res.should.have.status(201);
                                should.not.exist(err);
                                res.type.should.equal('application/json');
                                res.body.should.be.a('object');
                                res.body.Books.should.be.a('array');
                                //one book has been returned from two borrowed
                                res.body.Books.length.should.be.equal(1);
                                done();
                            });

                    });
                });
                done();

            });

    }).timeout(5000);
});