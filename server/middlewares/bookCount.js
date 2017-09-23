// Ths midddleware checks for the available quantity of books available in the library
const Borrowed = require('../models').Borrowed;
//const Books = require('../models').Book;

module.exports = {
    // count the number of books borrowed from borrowed JOIN model
    countBook(req, res /*, next*/ ) {
        Borrowed
            .findAndCountAll({
                where: {
                    bookId: req.params.bookId,
                    returned: false
                }
            })
            .then(book => {
                if (!book) {
                    res.json('Book not found');

                }
                if (book) {
                    var bookCount = book.count;
                    res.json(bookCount);
                    //if(bookCount)
                    /*Books.find({
                            attributes: ['quantity'],
                            where: {
                                id: req.params.bookId
                            }
                        })
                        .then(book => {
                            var quantity = Books.quantity;
                            var available = quantity - bookCount;
                            res.json(available);
                        })
                        .catch(err => res.status(400).send(err));*/
                }
            })
            .catch(err => res.status(400).send(err));
        //next();
    }

};