const userController = require('../controllers').userController;
const bookController = require('../controllers').bookController;
const genreController = require('../controllers').genreController;
const authorController = require('../controllers').authorController;
const ownerController = require('../controllers').ownerController;
const borrowController = require('../controllers').borrowController;
const searchController = require('../controllers').searchController;
const bookCount = require('../middlewares').bookCount;
const userCount = require('../middlewares').userCount;
const userSignUp = require('../middlewares').userSignUp;
const membershipVal = require('../middlewares').membershipVal;
const authorize = require('../middlewares').authorize;
const isLoggedIn = require('../middlewares').isLoggedIn;
const newPassword = require('../middlewares').newPassword;
const resetPassword = require('../email/passwordReset').resetPassword;
const forgotPassword = require('../email/passwordReset').forgotPassword;


module.exports = (app, passport) => {

    // route for home page
    app.get('/',
        function(req, res) {
            res.render('index.ejs'); // load the index.ejs file
        });
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    // the callback after google has authenticated the user
    app.get('/oauth2callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =====================================
    // FACEBOOK ROUTES =======================
    // =====================================

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: 'email' })
    );

    // the callback after facebook has authenticated the user
    app.get('auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //route to recover password
    app.post('/users/forgot_password',
        forgotPassword);

    // route for password reset link from user email with query ?token= user-token
    app.post('/auth/reset_password',
        resetPassword,
        (req, res) => res.redirect('/users/change_password'));
    //route for changing userPassword
    app.put('/users/change_password',
        newPassword.verifyUser,
        newPassword.changePassword);


    // Api for users to create account and login to application
    app.post('/users/register',
        userSignUp.signUp,
        userController.create,
        authorize.generateJWT);

    app.post('/users/signin',
        userController.signIn,
        authorize.generateJWT);

    app.post('/logout',
        authorize.logout);

    //Get all user
    app.get('/users',
        userController.getAllUser);

    // Get a single user
    app.get('/users/:userId',
        userController.getUser);

    // add book category
    app.post('/genre',
        authorize.verifyUser,
        authorize.adminProtect,
        genreController.create);

    // add books to library
    app.post('/books',
        authorize.verifyUser,
        authorize.adminProtect,
        bookController.create);

    // allow users to modify book information
    app.put('/books/:bookId',
        authorize.verifyUser,
        authorize.adminProtect,
        bookController.update);

    //create author details
    app.post('/authors',
        authorize.verifyUser,
        authorize.adminProtect,
        authorController.create);

    //update author details
    app.put('/authors/:authorId',
        authorize.verifyUser,
        authorize.adminProtect,
        authorController.update);

    // remove author
    app.delete('/authors/:authorId',
        authorize.verifyUser,
        authorize.adminProtect,
        authorController.delete);

    // allocate books to respective author
    app.post('/authors/:authorId/books/:bookId',
        authorize.verifyUser,
        authorize.adminProtect,
        ownerController.create);
    //Get all books in library
    app.get('/books',
        bookController.getBooks);
    //Get a single book
    app.get('/books/:bookId',
        bookController.getBooks);
    //Get all authors in library
    app.get('/authors',
        authorController.getAuthors);
    //Get a single author
    app.get('/authors/:authorId',
        authorController.getAuthors);
    //view books by category
    app.get('/genre/books',
        genreController.list);
    //allow user to delete book record
    app.delete('/books/:bookId',
        authorize.verifyUser,
        authorize.adminProtect,
        bookController.delete); //

    // allow users to borrow book
    app.post('/users/:userId/books/:bookId',
        authorize.verifyUser,
        membershipVal.memberVal,
        userCount.countUserBook,
        bookCount.checkBookCount,
        borrowController.create);

    // list all borrowed book by users
    app.get('/books/users',
        authorize.verifyUser,
        userController.userBooks);

    // enable user to return a book set returned col to true
    app.put('/users/:userId/books/:bookId',
        authorize.verifyUser,
        borrowController.update);

    // allow users to view unreturned books Add ?returned=false to url
    app.get('/users/:userId/books',
        authorize.verifyUser,
        userController.retrieveOne);
    //allow user to search for book(s)/author(s) ?q=title&type=books||type=authors`
    app.get(`/search`, searchController.getSearchResult);
};