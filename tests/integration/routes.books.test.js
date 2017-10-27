/**Test protected route and ensure only admin can create book, create book category and Author
 * Functions have been arranged in order of migration ,dependence on model's foreign key and
 * generation of token for user authentication and authorisation. Alteration in order will affect the functionality of the test cases
 */



//set env variable to test to access the test database
process.env.NODE_ENV = 'test';

let Book = require('../../server/models').Book;
let User = require('../../server/models').User;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Book', () => {
     before((done) => {
        User.destroy({ where: {} }).then(user => {
            if (user) { Book.destroy({ where: {} })
                .then(book => {
            if (book) { 
                done(); }})
            .catch(err => {
                 throw err;
                });
             }})
        .catch(err => {
             throw err; });

    });

    //Signup user admin and non admin for subsequent login and authorization

    describe('/POST users', () => {
        let nonAdmin = {
            username: 'seundee',
            email: 'seundaramola@gmail.com',
            password: 'sunny',
            admin: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        let admin = {
            username: 'John Carther',
            email: 'johncarter@gmail.com',
            password: 'admin',
            admin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        it('it should POST user details to database for admin and non-admin', (done) => {
            chai.request(app)
                .post('/api/users/register')
                // post non admin credentials to database
                .send(nonAdmin)
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
                    //admin property should be set to false
                    res.body.should.have.property('admin').to.be.false;
                    // all attributs of user should be generated
                    res.body.should.have.all.keys('id', 'username', 'email', 'password', 'createdAt', 'updatedAt', 'salt', 'hash', 'admin', 'memValue', 'validPassword');

                    //post admin credentals to database
                    chai.request(app)
                        .post('/api/users/register')
                        .send(admin)
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
                            //admin property should be set to true
                            res.body.should.have.property('admin').to.be.true;
                            // all attributs of user should be generated
                            res.body.should.have.all.keys('id', 'username', 'email', 'password', 'createdAt', 'updatedAt', 'salt', 'hash', 'admin', 'memValue', 'validPassword');
                            done();
                        });

                });
        }).timeout(50000);

    });

    // Test to ensure book category are added to database on admin login
    describe('/POST book category', () => {
        let category = {
            name: 'Computer science',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        it('it should add book category on admin login', (done) => {
            var agent = chai.request.agent(app);

            agent.post('/api/users/signin')
                .send({ username: 'John Carther', password: 'admin' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token').not.be.empty;

                    let token = res.body.token;
                    let loginCookie = res.headers['set-cookie'];

                    agent.post('/api/genre')
                        .set({ 'User-Agent': token }, { 'cookies': loginCookie })
                        .send(category)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('name').to.be.equal(category.name);
                            res.body.should.have.all.keys('id', 'name', 'createdAt', 'updatedAt');
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
                .post('/api/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(403);
                    // there should be errors
                    should.exist(err);
                    //body should be empty
                    res.body.should.be.empty;
                    // response should be a text bearing the error message
                    res.type.should.equal('text/html');
                    res.text.should.equal('please login');
                    done();
                });
        }).timeout(5000);


        //Unauthorized user attempt to create a book should fail
        it('it should signin and disallow non admin from creating book', (done) => {

            // follow up with log in
            var agent = chai.request.agent(app);
            agent.post('/api/users/signin')
                .send({ username: 'seundee', password: 'sunny' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token').not.be.empty;


                    let token = res.body.token;
                    let loginCookie = res.headers['set-cookie'];

                    // Unauthorised user:non-admin should not create book
                    agent.post('/api/books')
                        .set({ 'User-Agent': token }, { 'cookies': loginCookie })
                        .send(book)
                        .end((err, res) => {
                            should.exist(err);
                            res.type.should.equal('text/html');
                            res.should.have.status(401);
                            res.text.should.equal('You are not authorized to perform this action');
                            done();
                        });
                });
        }).timeout(5000);

        // Registered admin should signin and be able to create book
        it('it should signin allow admin to create book', (done) => {

            // follow up with log in
            var agent = chai.request.agent(app);
            agent.post('/api/users/signin')
                .send({ username: 'John Carther', password: 'admin' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token').not.be.empty;


                    let token = res.body.token;
                    let loginCookie = res.headers['set-cookie'];

                    // Unauthorised user:admin should  create book
                    agent.post('/api/books')
                        .set({ 'User-Agent': token }, { 'cookies': loginCookie })
                        .send(book)
                        .end((err, res) => {
                            // should have a status code of 201
                            res.should.have.status(201);
                            should.not.exist(err);
                            res.type.should.equal('application/json');
                            // the response should generate default membership value
                            res.body.should.have.property('title').to.be.equal(book.title);
                            res.body.should.have.property('genre_id').to.be.equal(book.genre_id);
                            res.body.should.have.property('description').to.be.equal(book.description);
                            res.body.should.have.property('ISBN').to.be.equal(book.ISBN);
                            res.body.should.have.property('quantity').to.be.equal(book.quantity);
                            res.body.should.have.property('available').to.be.equal(book.quantity);
                            // all attributs of user should be generated
                            res.body.should.have.all.keys('id', 'title', 'genre_id', 'description', 'ISBN', 'quantity', 'available', 'createdAt', 'updatedAt');

                            // Test to ensure author credential is created by signed in admin
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
                                    agent.post('/api/authors')
                                        .set({ 'User-Agent': token }, { 'cookies': loginCookie })
                                        .send(author)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.have.property('firstName').to.equal(author.firstName);
                                            res.body.should.have.property('lastName').to.equal(author.lastName);
                                            res.body.should.have.property('dateOfBirth').to.not.empty;
                                            res.body.should.have.property('dateOfDeath').to.not.empty;
                                            //ensure setter methods for full name and lifesapn work
                                            res.body.fullName.should.not.be.empty;
                                            res.body.should.have.property('lifeSpan').to.not.be.NaN
                                            done();
                                        });
                                }).timeout(5000);
                            });
                            done();
                        });
                });
        }).timeout(5000);

    });
});