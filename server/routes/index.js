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
  app.get('/api/v1/',
    function(req, res) {
      res.render('index.ejs'); // load the index.ejs file
    });
  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/api/v1/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }));

  // the callback after google has authenticated the user
  app.get('/api/v1/oauth2callback',
    passport.authenticate('google', {
      successRedirect: '/api/v1/profile',
      failureRedirect: '/api/v1/'
    }));

  // =====================================
  // FACEBOOK ROUTES =======================
  // =====================================

  app.get('/api/v1/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
  );

  // the callback after facebook has authenticated the user
  app.get('auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api/v1/profile',
      failureRedirect: '/api/v1/'
    }));

  //route to recover password
  app.post('/api/v1/users/forgot_password',
    forgotPassword);

  // route for password reset link from user email with query ?token= user-token
  app.post('/api/v1/auth/reset_password',
    resetPassword);
  //route for changing userPassword
  app.put('/api/v1/users/change_password',
    newPassword.verifyUser,
    newPassword.changePassword);


  // Api for users to create account and login to application
  app.post('/api/v1/users/register',
    userSignUp.signUp,
    userController.create,
    authorize.generateJWT);

  app.post('/api/v1/users/signin',
    userController.signIn,
    authorize.generateJWT);

  app.post('/api/v1/logout',
    authorize.logout);

  //Get all user
  app.get('/api/v1/users',
    userController.getAllUser);

  // Get a single user
  app.get('/api/v1/users/:userId',
    userController.getUser);

  // add book category
  app.post('/api/v1/genre',
    authorize.verifyUser,
    //authorize.adminProtect,
    genreController.create);

  // add books to library
  app.post('/api/v1/books',
    authorize.verifyUser,
    //authorize.adminProtect,
    bookController.create);

  // allow users to modify book information
  app.put('/api/v1/books/:bookId',
    authorize.verifyUser,
    //authorize.adminProtect,
    bookController.update);

  //create author details
  app.post('/api/v1/authors',
    authorize.verifyUser,
    //authorize.adminProtect,
    authorController.create);

  //update author details
  app.put('/api/v1/authors/:authorId',
    authorize.verifyUser,
    //authorize.adminProtect,
    authorController.update);

  // remove author
  app.delete('/api/v1/authors/:authorId',
    authorize.verifyUser,
    //authorize.adminProtect,
    authorController.delete);

  // allocate books to respective author
  app.post('/api/v1/authors/:authorId/books/:bookId',
    authorize.verifyUser,
    //authorize.adminProtect,
    ownerController.create);
  //Get all books in library
  app.get('/api/v1/books',
    bookController.getBooks);
  //Get a single book
  app.get('/api/v1/books/:bookId',
    bookController.getBooks);
  //Get all authors in library
  app.get('/api/v1/authors',
    authorController.getAuthors);
  //Get a single author
  app.get('/api/v1/authors/:authorId',
    authorController.getAuthors);
  //view books by category
  app.get('/api/v1/genre/books',
    genreController.list);
  //allow user to delete book record
  app.delete('/api/v1/books/:bookId',
    authorize.verifyUser,
    //authorize.adminProtect,
    bookController.delete); //

  // allow users to borrow book
  app.post('/api/v1/users/:userId/books/:bookId',
    authorize.verifyUser,
    membershipVal.memberVal,
    userCount.countUserBook,
    bookCount.checkBookCount,
    borrowController.create);

  // list all borrowed book by users
  app.get('/api/v1/borrowed-books/users',
    authorize.verifyUser,
    userController.userBooks);

  // enable user to return a book set returned col to true
  app.put('/api/v1/users/:userId/books/:bookId',
    authorize.verifyUser,
    borrowController.update);

  // allow users to view unreturned books Add ?returned=false to url
  app.get('/api/v1/users/:userId/books',
    authorize.verifyUser,
    userController.retrieveOne);
  //allow user to search for book(s)/author(s) ?q=title&type=books||type=authors`
  app.get('/api/v1/search',
    searchController.getSearchResult);
};