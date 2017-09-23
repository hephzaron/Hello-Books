// Ths midddleware checks for the available quantity of books available in the library
const Borrowed = require('../models').Borrowed;
const Books = require('../models').Book;

module.exports = {
    // count the number of books borrowed from borrowed JOIN model
    checkBookCount: function(req, res, next) {
        Borrowed
            .findAndCountAll({
                where: {
                    bookId: req.params.bookId,
                    returned: false
                }
            })
            .then(book => {
                if (book.count == 0) {
                    //res.json('Book is available'); // responsible for unahandled rejection error, used to check response
                    next();

                } else if (book.count > 0) {
                    var bookCount = book.count;
                    // get quantity of books left in book module
                    Books.find({
                            where: {
                                id: req.params.bookId
                            }
                        })
                        .then(qty => {
                            if (!qty) { throw Error; }
                            if (qty) {
                                // update books available to borrow
                                var available = qty.quantity - bookCount;
                                return qty.update({
                                        available: available
                                    }).then(qty => {
                                        if (available <= 0) {
                                            res.json('Book not available');
                                        }
                                        if (qty && available > 0) {
                                            // res.json(qty.available); // responsible for unahandled rejection error, used to check response
                                            next();
                                        }
                                    })
                                    .catch(err => { throw err; });
                            }
                        })
                        .catch(err => res.status(400).send(err));
                } else { throw Error; }
            })
            .catch(err => res.status(400).send(err));
    }
};