// ths add books to the library

const Books = require('.../models').Books;

module.exports = {
        create(req, res) {
            return Books
                .create({
                    bookId: req.params.bookId,
                    title: req.body.title,
                    bookInfo: req.body.bookInfo,
                    quantity: req.body.quantity
                })
                .then(books => res.status(201).send(books))
                .catch(err => res.status(400).send(err));
        },
        list(req, res) {
            return Books
                .all()
                .then(books => res.status(200).send(books))
                .catch(err => res.status(400).send(err));
        },
        update(req, res) {

            // find exiisting resource id
            Books.findById(req.params.bookId, function(err, books) {
                    if (err) {
                        res.status(500).send(err);
                    } else {

                        /*update book library with any possible book attribute 
                        that may have been submitted to the body of the request
                        if attribute not found, revert back to default*/

                        book.title = req.body.title || book.title;
                        book.bookInfo = req.body.bookInfo || book.bookInfo;
                        book.quantity = req.body.quantity || book.quantity

                        // save updated info
                        book.save(function(err, books) {
                            if (err) {
                                res.status(500).send(err)
                            }
                            res.send(books);
                        })
                    };
                }
            }
        }