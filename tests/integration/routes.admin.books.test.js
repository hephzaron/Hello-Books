/**Test protected route and ensure only admin can create book, create book category and Author
 * Functions have been arranged in order of migration ,dependence on model's foreign key and
 * generation of token for user authentication and authorisation. Alteration in order will affect the functionality of the test cases
 */

//set env variable to test to access the test database
process.env.NODE_ENV = 'test';
const db = require('../../server/models');
let Author = require('../../server/models').Author;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

let agent = chai.request.agent(app); //admin route
let token;

//Signup user admin and non admin for subsequent login and authorization
describe('/POST users', () => {
    before(function(done) {
        this.timeout(7000);
        db.sequelize.sync({ force: true, logging: false }).then(() => {
            done();
        });
    });

    let nonAdmin = {
        username: 'seundee',
        email: 'seundaramola@gmail.com',
        password: 'sunny',
        confirmPassword: 'sunny',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    let admin = {
        username: 'John Carther',
        email: 'tobi_daramola@yahoo.com',
        password: 'admin',
        confirmPassword: 'admin',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    it('it should POST user details to database for admin and non-admin', (done) => {
        chai.request(app)
            .post('/users/register')
            // post non admin credentials to database
            .send(nonAdmin)
            .end((err, res) => {
                // there should be a 201 status code
                // (indicating that something was "created")
                res.should.have.status(200);
                res.body.should.be.a('object');
                // there should be no errors
                should.not.exist(err);
                // the response should be JSON
                res.type.should.equal('application/json');
                res.body['message'].should.equal('Authentication successful');
                //admin property should be set to false
                res.body['user'].should.have.property('admin').to.be.false;
                // all attributs of user should be generated
                res.body['user'].should.have.all.keys('username', 'token', 'userId', 'admin');

                //post admin credentals to database
                chai.request(app)
                    .post('/users/register')
                    .send(admin)
                    .end((err, res) => {
                        // there should be a 201 status code
                        // (indicating that something was "created")
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        // there should be no errors
                        should.not.exist(err);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        res.body['message'].should.equal('Authentication successful');
                        //admin property should be set to true
                        res.body['user'].should.have.property('admin').to.be.true;
                        // all attributs of user should be generated
                        res.body['user'].should.have.all.keys('username', 'token', 'userId', 'admin');
                        done();
                    });

            });
    }).timeout(50000);

});

// Test to ensure book category are added to database on admin login
describe('/POST Book category', () => {
    let category = {
        name: 'Computer science',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    it('it should add book category on admin login', (done) => {

        agent.post('/users/signin')
            .send({ username: 'John Carther', password: 'admin' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body['user'].should.have.property('token').not.be.empty;
                token = res.body['user'].token;

                agent.post('/genre')
                    .set({ 'x-access-token': token })
                    .send(category)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body['message'].should.equal(`${category.name} have been added to category`);
                        res.body['genre'].should.have.property('name').to.be.equal(category.name);
                        res.body['genre'].should.have.all.keys('id', 'name', 'createdAt', 'updatedAt');
                        done();
                    });

            });
    }).timeout(5000);

});

describe('/POST book', () => {

    let book = {
        title: 'Java programming for beginners',
        genre_id: 1,
        description: 'This introduces readers to the basic of Obejct Oriented Programmng Language',
        ISBN: '33332-143-2457',
        quantity: 7,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // attempt to create book before being authenticated

    it('it should not create book where authentication fails', (done) => {
        chai.request(app)
            .post('/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(401);
                // there should be errors
                should.exist(err);
                // response should be a text bearing the error message
                res.type.should.equal('application/json');
                res.body['message'].should.equal('Token invalid or expired-user not found');
                done();
            });
    }).timeout(5000);


    //Unauthorized user attempt to create a book should fail
    it('it should signin and disallow non admin from creating book', (done) => {

        // follow up with log in
        let agent = chai.request.agent(app);
        agent.post('/users/signin')
            .send({ username: 'seundee', password: 'sunny' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body['user'].should.have.property('token').not.be.empty;
                let token = res.body['user'].token;

                // Unauthorised user:non-admin should not create book
                agent.post('/books')
                    .set({ 'x-access-token': token })
                    .send(book)
                    .end((err, res) => {
                        should.exist(err);
                        res.type.should.equal('application/json');
                        res.should.have.status(403);
                        res.body['message'].should.equal('You are not authorized to perform this action');
                        done();
                    });
            });
    }).timeout(5000);

    // Registered admin should signin and be able to create book
    it('it should signin and allow admin to create book', (done) => {

        agent.post('/users/signin')
            .send({ username: 'John Carther', password: 'admin' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body['user'].should.have.property('token').not.be.empty;
                let token = res.body['user'].token;

                // Unauthorised user:admin should  create book
                agent.post('/books')
                    .set({ 'x-access-token': token })
                    .send(book)
                    .end((err, res) => {
                        // should have a status code of 201
                        res.should.have.status(201);
                        should.not.exist(err);
                        res.type.should.equal('application/json');
                        // the response should generate default membership value
                        res.body['book'].should.have.property('title').to.be.equal(book.title);
                        res.body['book'].should.have.property('genre_id').to.be.equal(book.genre_id);
                        res.body['book'].should.have.property('description').to.be.equal(book.description);
                        res.body['book'].should.have.property('ISBN').to.be.equal(book.ISBN);
                        res.body['book'].should.have.property('quantity').to.be.equal(book.quantity);
                        res.body['book'].should.have.property('available').to.be.equal(book.quantity);
                        // all attributs of user should be generated
                        res.body['book'].should.have.all.keys('id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'createdAt', 'updatedAt');
                        done();
                    });
            });
    }).timeout(5000);
});
describe('/POST Author', () => {
    //Let Admin be able to create Author list after login
    it('admin should be able to create authors after login', (done) => {
        let author = {
            firstName: 'Nelkon',
            lastName: 'Parker',
            dateOfBirth: '1876-12-03',
            dateOfDeath: '1994-10-15',
            createdAt: new Date(),
            updatedAt: new Date()

        };
        agent.post('/authors')
            .set({ 'x-access-token': token })
            .send(author)
            .end((err, res) => {
                res.should.have.status(201);
                res.body['message'].should.equal(`${author.firstName} ${author.lastName}, successfully added`);
                res.body['author'].should.have.property('firstName').to.equal(author.firstName);
                res.body['author'].should.have.property('lastName').to.equal(author.lastName);
                res.body['author'].should.have.property('dateOfBirth').to.not.empty;
                res.body['author'].should.have.property('dateOfDeath').to.not.empty;
                //ensure setter methods for full name and lifesapn work
                res.body['author'].fullName.should.not.be.empty;
                res.body['author'].should.have.property('lifeSpan').to.not.be.NaN;
                done();
            });
    }).timeout(5000);
});

describe('PUT /books/:bookId', () => {
    let updatedBook = {
        genre_id: 1,
        title: 'Java programming for beginners',
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    //get actual id of book present in database ofr test purposes
    const bookId = 1;

    it('it should update book record in database', (done) => {
        agent.put('/books/' + bookId)
            .set({ 'x-access-token': token })
            .send(updatedBook)
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.type.should.equal('application/json');
                //original record should retain value of unedited field
                res.body['message'].should.equal(`${updatedBook.title} record have been updated`);
                res.body['updatedBook'].should.have.property('title').to.equal('Java programming for beginners');
                //edited field should be updated in the database
                res.body['updatedBook'].should.have.property('genre_id').to.equal(updatedBook.genre_id);
                res.body['updatedBook'].should.have.property('quantity').to.equal(updatedBook.quantity);
                done();
            });
    }).timeout(5000);

    //Assign book to authors and vice-versa

    it('it should assign book to author or vice versa', (done) => {

        Author.find({
            where: {
                firstName: 'Nelkon'
            }
        }).then((author) => {

            let authorId = author.id;

            agent.post('/authors/' + authorId + '/books/' + bookId)
                .set({ 'x-access-token': token })
                .end((err, res) => {
                    res.should.have.status(201);
                    should.not.exist(err);
                    res.type.should.equal('application/json');
                    res.body['message'].should.equal('Book have been assigned successfully');
                    //Intended book should be attached to the right author
                    res.body['authorBook'].should.have.property('authorId').to.be.equal(authorId);
                    res.body['authorBook'].should.have.property('bookId').to.be.equal(bookId);
                    done();
                });

        }).catch(err => { throw err; });

    }).timeout(5000);

    it('it should delete book from database', (done) => {
        agent.del('/books/' + bookId)
            .set({ 'x-access-token': token })
            .end((err, res) => {

                res.should.have.status(200);
                should.not.exist(err);
                res.type.should.equal('application/json');
                res.body['message'].should.equal('Book have been successfully deleted');
                done();
            });
    }).timeout(5000);

});