/**
 * This test getting list of books from databse either by category or authors
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);


describe('GET BOOK', () => {

    //get  all books
    it('it should get all books in database', (done) => {
        chai.request(app)
            .get('/api/users/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.be.a('array');
                // Only three books have been seed to database
                res.body.length.should.be.eql(3);
                done();
            });

    });

    // It should get list of all authors and all books contributed
    it('it should get all authors with the books written', (done) => {

        chai.request(app)
            .get('/api/authors/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                //Body should contain author object and the books published by each author
                res.body.should.be.a('array');
                // Only two authors have been seed to database
                res.body.length.should.be.eql(2);
                done();
            });

    });

    //list books by category
    it('it should get books by categories', (done) => {
        chai.request(app)
            .get('/api/genre/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.be.a('array');
                // Only three categories have been seed to database
                res.body.length.should.be.eql(3);
                done();
            });
    });
    //list all books written by the same author
    it('it should list all books for a single author', (done) => {

        //consider author with id equals 2 from seed data
        let authorId = 2;

        chai.request(app)
            .get('/api/authors/' + authorId + '/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.be.a('object');
                //res.body.length.should.be.eql(1);
                res.body.should.have.property('Books');
                //only two books belongs to author with id equals 2
                res.body.Books.length.should.be.equal(2);

                done();
            });
    });
});