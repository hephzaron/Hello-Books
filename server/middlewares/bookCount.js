// Ths midddleware checks for the available quantity of books available in the library
const Borrowed = require('../models').Borrowed;
const Books = require('../models').Book;

module.exports = {
    // count the number of books borrowed from borrowed JOIN model
    checkBookCount: function(req, res, next) {
        Borrowed
            .findAndCountAll({ //get the number of a book yet to be returned
                where: {
                    bookId: req.params.bookId,
                    returned: false
                }
            })
            .then(book => {
                if (book.count === 0) { //if count is 0, i.e book has not been borrowed, pass to user

                    next();

                } else if (book.count > 0) {
                    let bookCount = book.count;
                    /**If book exists in the borrowed model, get the number and the count of book that 
                     * exists in the Books table 
                     */
                    Books.find({
                            where: {
                                id: req.params.bookId
                            }
                        })
                        .then(qty => {
                            if (!qty) { throw Error; }
                            if (qty) {
                                let available = qty.quantity - bookCount; // update books available to borrow
                                return qty.update({
                                    available: available
                                }).then(qty => {
                                    if (available <= 0) {
                                        res.status(403).send('Book not available');
                                    }
                                    if (qty && available > 0) {
                                        next();
                                    }
                                }).catch(err => { throw err; });
                            }
                        }).catch(err => res.status(400).send(err));
                } else { throw Error; }
            }).catch(err => res.status(400).send(err));
    }
};