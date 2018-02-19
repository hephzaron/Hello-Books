/** This checks and ensure user can only borrow the same book after it 
has been returned
user not entitle to borrow the same book that has not been returned*/
const Books = require('../models').Book;
const Borrowed = require('../models').Borrowed;

module.exports = {
    countUserBook: function(req, res, next) {
        // check if book exist in library
        Books.find({
            where: {
                id: req.params.bookId
            }
        }).then(book => {
            if (!book) {
                res.status(404).send({ message: 'Book not found' });
            }
            if (book) {
                Borrowed.find({
                        where: {
                            userId: req.params.userId,
                            bookId: req.params.bookId,
                            returned: false
                        }
                    }).then(user => {
                        // If no record of user exist for borrowed book execute next middleware
                        if (!user) {
                            next();
                        }
                        //If record of user exist for a book yet unreturned alert user and discontinue
                        if (user) {
                            res.status(405).send({ message: 'You are not allowed to borrow this book, yet to be returned' });
                        }
                    })
                    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));

            }
        }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));

    }
};