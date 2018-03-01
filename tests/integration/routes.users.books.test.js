/**
 * This test getting list of books from databse either by category or authors
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const db = require('../../server/models');

//import models
const Genre = require('../../server/models').Genre;
const Book = require('../../server/models').Book;
const Author = require('../../server/models').Author;
const Owner = require('../../server/models').Ownership;

//import test-dATA
const genreData = require('../unit/models/test-data').Genres;
const bookData = require('../unit/models/test-data').Books;
const authorData = require('../unit/models/test-data').Authors;
const ownerData = require('../unit/models/test-data').Owners;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);


describe('GET BOOK', () => {
    before(function(done) {
        this.timeout(5000);
        db.sequelize.sync({ force: true, logging: false }).then(() => {
            Genre.bulkCreate(genreData).then(() => {
                Book.bulkCreate(bookData).then(() => {
                    Author.bulkCreate(authorData).then(() => {
                        Owner.bulkCreate(ownerData).then(owner => {
                            if (owner) {
                                done();
                            }
                        });
                    });

                });
            });


        });

    });

    //get  all books
    it('it should get all books in database', (done) => {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body['books'].should.be.a('array');
                // Only three books have been seed to database
                res.body['books'].length.should.be.eql(3);
                done();
            });

    });

    // It should get list of all authors and all books contributed
    it('it should get all authors with the books written', (done) => {

        chai.request(app)
            .get('/authors')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                //Body should contain author object and the books published by each author
                res.body['authors'].should.be.a('array');
                // Only two authors have been seed to database
                res.body['authors'].length.should.be.eql(2);
                done();
            });

    });

    //list books by category
    it('it should get books by categories', (done) => {
        chai.request(app)
            .get('/genre/books')
            .end((err, res) => {
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body['genres'].should.be.a('array');
                // Only three categories have been seed to database
                res.body['genres'].length.should.be.eql(3);
                done();
            });
    });
    //list all books written by the same author
    it('it should list all books for a single author', (done) => {

        //consider author with id equals 2 from seed data
        let authorId = 2;

        chai.request(app)
            .get(`/authors/${authorId}`)
            .end((err, res) => {
                const { author } = res.body;
                res.type.should.equal('application/json');
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.be.a('object');
                //res.body.length.should.be.eql(1);
                author[0].should.have.property('Books');
                //only two books belongs to author with id equals 2
                author[0].Books.length.should.be.equal(2);
                //array of length 1 for a single author should be returned
                author.length.should.be.equal(1);
                done();
            });
    });
    it('it should search for book', (done) => {
        let title = 'data';
        chai.request(app)
            .get(`/search`)
            .query(`q=${title}&type=books`)
            .end((err, res) => {
                let re = /data/i // string 'data' should be present in returned books
                res.body['message'].should.equal('Book found');
                res.body['books'].length.should.equal(2);
                re.test(res.body.books[0].title).should.equal(true);
                re.test(res.body.books[1].title).should.equal(true);
                done();
            })
    });

    it('it should search for author', (done) => {
        let name = 'nelkon';
        chai.request(app)
            .get(`/search`)
            .query(`q=${name}&type=authors`)
            .end((err, res) => {
                let re = /nelkon/i // string 'nelkon' should be present in returned authors
                res.body['message'].should.equal('Author found');
                res.body['author'].length.should.equal(1);
                re.test(res.body.author[0].fullName).should.equal(true);
                done();
            })
    });
});