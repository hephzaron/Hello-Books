//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const db = require('../../server/models');

// import book model
const Genre = require('../../server/models').Genre;
const Book = require('../../server/models').Book;
const User = require('../../server/models').User;

//import needed data for testing
const genreData = require('../unit/models/test-data').Genres;
const bookData = require('../unit/models/test-data').Books;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

let token, userId;
let agent = chai.request.agent(app);

describe('REGISTER USER', () => {
    //create test admin user data to mock admin object
    let admin = {
        username: 'Daramola',
        email: 'tobi_daramola@yahoo.com',
        password: 'admin',
        confirmPassword: 'admin',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    before(function(done) {
        this.timeout(20000);
        db.sequelize.sync({ force: true, logging: false }).then(() => {
            User.create(admin);
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
        confirmPassword: 'phil17',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    it('it should register user', (done) => {
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.have.all.keys('message', 'user');
                res.body['message'].should.equal('Authentication successful');
                done();

            });
    }).timeout(3000);
});
//sign in a user to test the protected routes from seeders entries
describe('USER SHOULD LOGIN TO BORROW BOOK', () => {

    it('it should signin user and generate token to access routes', (done) => {

        agent.post('/users/signin')
            .send({ username: 'Philip', password: 'phil17' })
            .end((err, res) => {

                res.should.have.status(200);
                res.body['user'].should.have.property('token').not.be.empty;

                token = res.body['user'].token;
                // get user id from login
                userId = res.body['user'].userId;

                done();

            });

    }).timeout(5000);
});
describe('BORROW AND RETURN BOOKS', () => {
    it('it should borrow first book', (done) => {

        try {
            //User with userId borrows two book with id equals 1 and id equals 2
            let bookId = 1;
            agent.post('/users/' + userId + '/books/' + bookId)
                .set({ 'x-access-token': token })
                .end((err, res) => {
                    // it should be successful
                    res.status.should.equals(201);
                    res.type.should.equal('application/json');
                    res.body['message'].should.equals('You have successfully borrowed this book');
                    res.body['borrowedBook'].should.have.property('returned').to.be.equal(false);
                    res.body['borrowedBook'].should.have.all.keys('borrowId', 'userId', 'bookId', 'createdAt', 'updatedAt', 'returned');
                    done();
                });

        } catch (e) { console.log(e); }

    }).timeout(17000);
    it('it should borrow second book', (done) => {
        try {
            //....borrow second book with id equals 2
            let bookId = 2;
            agent.post('/users/' + userId + '/books/' + bookId)
                .set({ 'x-access-token': token })
                .end((err, res) => {
                    // it should be successful
                    res.status.should.equals(201);
                    res.type.should.equal('application/json');
                    res.body['borrowedBook'].should.have.property('returned').to.be.equal(false);
                    res.body['borrowedBook'].bookId.should.equal(2);
                    res.body['borrowedBook'].should.have.all.keys('borrowId', 'userId', 'bookId', 'createdAt', 'updatedAt', 'returned');
                    done();
                });

        } catch (e) { console.log(e); }

    }).timeout(17000);

    it('it should get unreturned book by a user before return of any', (done) => {
        agent.get('/users/' + userId + '/books')
            .set({ 'x-access-token': token })
            .query('returned=false')
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.body['borrowedBooks'].Books.should.be.a('array');
                //Two of the books yet to be returned
                res.body['borrowedBooks'].Books.length.should.be.eql(2);
                done();
            });

    });

    it('it should return books borrowed by user', (done) => {

        //returned properties to true for user to return book
        let book = {
            returned: true
        };
        let bookId = 1;
        agent.put('/users/' + userId + '/books/' + bookId)
            .set({ 'x-access-token': token })
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.body['message'].should.equal('You have succesfully returned this book');
                res.body['returnedBook'].should.have.property('returned').to.be.equal(true);
                done();

            });

    });
    it('it should get unreturned book by a user', (done) => {
        agent.get('/users/' + userId + '/books')
            .set({ 'x-access-token': token })
            .query('returned=false')
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.body['borrowedBooks'].Books.should.be.a('array');
                //one book has been returned from two borrowed
                res.body['borrowedBooks'].Books.length.should.be.equal(1);
                done();
            });

    });
});