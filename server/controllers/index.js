const userController = require('./userController');
const bookController = require('./bookController');
const genreController = require('./genreController');
const authorController = require('./authorController');
const ownerController = require('./ownerController');
const borrowController = require('./borrowController');
const searchController = require('./searchController');

module.exports = {
    userController,
    bookController,
    genreController,
    authorController,
    ownerController,
    borrowController,
    searchController
};