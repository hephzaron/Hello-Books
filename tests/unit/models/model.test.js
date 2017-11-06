/**
 * This test should create books and its associating models, genre model must be created to calssify books.
 * Author model is created to for books that have more than one author, with its associations
 * User model is created  to test its -belongsToMany association with user, this associations
 * takes care books borrowed by user
 * 
 * The essence of creating other models is to test Book model associations
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

//require('log-suppress').init(console, 'test');
const db = require('../../../server/models');
const testData = require('./test-data');

// import models
const User = require('../../../server/models').User;
const Author = require('../../../server/models').Author;
const Genre = require('../../../server/models').Genre;
const Book = require('../../../server/models').Book;
const Owner = require('../../../server/models').Ownership;
const Borrow = require('../../../server/models').Borrowed;

//import test data
let userData = testData.Users;
let authorData = testData.Authors;
let genreData = testData.Genres;
let bookData = testData.Books;
let ownerData = testData.Owners;
let borrowData = testData.Borrowed;

const assert = require('chai').assert;

describe('BOOK MODEL', () => {

    try {
        before((done) => {
            db.sequelize.sync({ force: true }).then(() => {
                User.bulkCreate(userData).then(() => {
                    Author.bulkCreate(authorData).then(() => {
                        Genre.bulkCreate(genreData).then(() => {
                            Book.bulkCreate(bookData).then(() => {
                                Owner.bulkCreate(ownerData).then(() => {
                                    Borrow.bulkCreate(borrowData).then((borrow) => {
                                        if (borrow) {
                                            done();
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });

        }).timeout(5000);

    } catch (e) {
        console.log(e);
    }

    //USER MODEL

    describe('USER Model', () => {
        it('it should create a user object with its properties', (done) => {
            User.findAll().then(user => {
                assert.equal(typeof(user), 'object'); //an object should be returned
                assert.equal(user.length, 3); // All user should be created
                assert.isNotEmpty(user[0].hash && user[0].salt); //password should be hashed and not null
                done();
            });
        }).timeout(5000);
        it('it should have association -belongsToMany for user borrowed books', (done) => {
            User.findOne({ where: { id: 1 } }).then(user => {
                user.getBooks().then(userBooks => {
                    assert.equal(userBooks.length, 2); //authorOne should return an array of two books
                    assert.equal(userBooks[0].get().title, bookData[0].title); //borrowed book with id:1
                    assert.equal(userBooks[1].get().title, bookData[2].title); //borrowed book with id:3
                    //find book id:2 in returned arrays
                    let check = userBooks.filter((object) => {
                        return object.get().title == bookData[1].title;
                    });

                    assert.deepEqual(check, []); //book id:2 should not be present in returned user books
                    done();
                });

            });
        }).timeout(5000);

    });

    //AUTHOR MODEL

    describe('AUTHOR Model', () => {
        it('it should create author object with its properties', (done) => {
            Author.findAll().then((authors) => {
                let fullName = authorData[0].firstName + ' ' + authorData[0].lastName;
                let [, ...otherKeys] = Object.keys(authors[0].dataValues);
                try {
                    assert.equal(typeof(authors), 'object'); // object should be created
                    assert.equal(authors.length, 2); //all two authors should be returned
                    // getter methods should be functional
                    assert.equal(authors[0].fullName, fullName);
                    assert.equal(typeof(authors[0].lifeSpan), 'number');
                    assert.deepEqual(otherKeys, Object.keys(authorData[0])); //all object properties should persist to database 
                    done();
                } catch (error) {
                    console.log(error.message);
                }
            });
        }).timeout(5000);

        it('it should have -belongsToMany association and only author\'s books', (done) => {
            Author.findOne({ where: { id: 1 } }).then(author => {
                author.getBooks().then(authorBooks => {
                    assert.equal(authorBooks.length, 2); //authorOne should return an array of two books
                    assert.equal(authorBooks[0].get().id, 2);
                    assert.equal(authorBooks[1].get().id, 3);

                    let check = authorBooks.filter((object) => {
                        return object.get().id == 1;
                    });
                    assert.deepEqual(check, []); //book id:1 should not be present for author id:1 book published
                    done();
                });
            });

        }).timeout(5000);


    });

    //GENRE MODEL
    describe('GENRE Model', () => {
        it('it should create genre object with its properties', (done) => {
            Genre.findAll().then((genres) => {

                let [, ...otherKeys] = Object.keys(genres[0].dataValues);
                try {
                    assert.equal(typeof(genres), 'object'); // object should be created
                    assert.equal(genres.length, 3); //all three genres should be returned
                    assert.deepEqual(otherKeys, Object.keys(genreData[0])); //all object properties should persist to database 
                    done();
                } catch (error) {
                    console.log(error.message);
                }
            });
        }).timeout(5000);

        it('it should have -hasMany association and only books in that category', (done) => {
            Genre.findOne({
                where: { name: 'Data Science' },
                include: { model: Book, as: 'books' }
            }).then(genre => {
                let genreBook = genre.books;
                assert.equal(typeof(genreBook), 'object'); // object should be returned
                assert.equal(genreBook.length, 2); // total books in category should be 2
                // The right books categorise should be returned
                assert.equal(genreBook[0].dataValues.title, 'Fundamentals of Statistics for Data Scientist');
                assert.equal(genreBook[1].dataValues.title, 'R - the tool for data science');

                let check = genreBook.filter((object) => {
                    return object.get().title == 'Java programming for beginners';
                });
                // it should not return a book not in that category    
                assert.deepEqual(check, []);

                console.log(genreBook);
                done();
            });

        }).timeout(5000);


    });

    //BOOK MODEL
    describe('BOOK Model', () => {
        it('it should create a book object with its properties', (done) => {
            Book.findAll().then(books => {
                assert.equal(typeof(books), 'object'); // type returned should be an object
                assert.equal(books.length, 3); //all book object should persist to database
                let [, ...otherKeys] = Object.keys(books[0].dataValues); // destructure book object to remove id
                assert.deepEqual(otherKeys, Object.keys(bookData[0])); // Ensure all book keys persist to database
                done();
            });

        }).timeout(5000);

        //belongsToMany association users - borrowed book
        it('it should have association -belongsToMany for all users with the same book', (done) => {
            //Use book with id:3 with multiple users(that have borrowed it)
            Book.findOne({ where: { id: 3 } }).then(book => {
                book.getUsers().then(bookUsers => {
                    assert.equal(typeof(bookUsers), 'object');
                    assert.equal(bookUsers.length, 2);
                    assert.equal(bookUsers[0].get().id, 1);
                    assert.equal(bookUsers[1].get().id, 2);
                    let check = bookUsers.filter((object) => {
                        return object.get().id == 3;
                    });

                    assert.deepEqual(check, []); //user id:3 should not be present in for book id:3 borrowed
                    done();
                });
            });

        }).timeout(5000);

        //belongsToMany association authors
        it('it should have association -belongsToMany for all authors with the same book', (done) => {

            //Use book with id:3 with multiple authors(that owns it)
            Book.findOne({ where: { id: 3 } }).then(book => {
                book.getAuthors().then(bookAuthors => {
                    assert.equal(typeof(bookAuthors), 'object');
                    assert.equal(bookAuthors.length, 2);
                    assert.equal(bookAuthors[0].get().id, 1);
                    assert.equal(bookAuthors[1].get().id, 2);
                    let check = bookAuthors.filter((object) => {
                        return object.get().id == 3;
                    });

                    assert.deepEqual(check, []); //author id:3 should not be present in for book id:3 published
                    done();
                });
            });

        }).timeout(5000);

        //belongsTo association Gnere
        it('it should have association -belongsTo one Genre', (done) => {
            Book.findOne({
                where: { title: 'R - the tool for data science' },
                include: { model: Genre }
            }).then(book => {
                let bookGenre = book.Genre.dataValues;
                /**This removes key id from returned genre data 
                 * so it's content can be compared with the input data */
                function remove(key, obj) {
                    let copy = Object.assign({}, obj);
                    delete copy[key];
                    return copy;
                }

                assert.equal(typeof(bookGenre), 'object');
                assert.equal(book.Genre.length, undefined); // book should belong to only one genre and not return an array of Genre
                assert.deepEqual(remove('id', bookGenre), genreData[2]); //book should return the right category
                done();
            });

        }).timeout(5000);

    });

    //OWNER MODEL
    describe('OWNER Model', () => {
        it('it should create a join table for book owners', (done) => {
            Owner.findAll().then(owner => {
                assert.equal(owner.length, 4);

                let testCompoundkey = {
                    authorId: owner[0].authorId,
                    bookId: owner[0].bookId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                //Should not create if compound-authorId,bookId key already exist
                Owner.create(testCompoundkey).then().catch(error => {
                    assert.equal(error.original.detail, 'Key ("authorId", "bookId")=(2, 1) already exists.');
                    done();
                });
            });
        }).timeout(5000);
    });

    //BORROW MODEL

    describe('BORROWED Model', () => {
        it('it should create a join table for borrowed books', (done) => {
            Borrow.findAll().then(borrow => {
                assert.equal(borrow.length, 3);

                let testCompoundkey = {
                    userId: borrow[0].userId,
                    bookId: borrow[0].bookId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                //Should not create if compound-userId,bookId key already exist
                Borrow.create(testCompoundkey).then().catch(error => {
                    assert.equal(error.original.detail, 'Key ("userId", "bookId")=(1, 1) already exists.');
                    done();
                });
            });
        }).timeout(5000);
    });



});