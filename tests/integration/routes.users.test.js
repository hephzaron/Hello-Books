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
    beforeEach((done) => {
        User.destroy().then(user => {
            if (user) { done(); }
        }).then(() => {
            done();
        }).catch(err => { throw err; });
    });

    describe('/POST user', () => {
        it('it should POST user detals to database', (done) => {
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
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 201 status code
                    // (indicating that something was "created")
                    res.status.should.equal(201);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    res.body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": 1 user object}
                    res.body.data[0].should.include.keys(
                        'id', 'username', 'email', 'created_at');

                    done();
                });
        });
    });
});