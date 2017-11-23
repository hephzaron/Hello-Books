const Borrowed = require('../models').Borrowed;
const User = require('../models').User;
const Book = require('../models').Book;
const Genre = require('../models').Genre;
const mailAdmin = require('../email/notifyAdmin').mailAdmin;

module.exports = {

    //allow users to borrow book
    create(req, res) {
        return Borrowed
            .create({
                userId: req.params.userId,
                bookId: req.params.bookId,
                returned: false
            })
            //get details of book borrowed and notify admin
            .then(borrow => {

                let userId = borrow.userId;
                let bookId = borrow.bookId;
                let date = borrow.createdAt;
                //get complete user details from users table in the database
                return User.findById(userId).then(user => {
                    let userEmail = user.email;
                    let username = user.username;
                    //get details of book borrowed from books table in the database
                    return Book.findById(bookId, {
                        include: {
                            model: Genre,
                            as: 'genre'
                        }
                    }).then(function(book) {
                        //wait for borrow details to be fetched and sent to admin
                        let timeout = 10000; //set a timeout of 10s
                        this.setTimeout(() => {
                            let bookTitle = book.title;
                            let genre = book.genre;
                            let userData = {
                                username: username,
                                email: userEmail,
                                bookTitle: bookTitle,
                                genre: genre,
                                date: date
                            };
                            mailAdmin(userData);
                            res.status(201).send(borrow);

                        }, timeout);
                    });
                });
            })
            .catch(err => res.status(400).send(err));
    },
    update(req, res) {
        return Borrowed
            .find({
                where: {
                    bookId: req.params.bookId,
                    userId: req.params.userId
                }
            })
            .then(books => {
                if (!books) {
                    return res.status(404).send({
                        message: 'Book  Not Found'
                    });
                }
                return books
                    .update({
                        returned: req.body.returned || books.returned
                    })
                    .then(updatedBooks => res.status(200).send(updatedBooks))
                    .catch(err => res.status(400).send(err));
            })
            .catch(err => res.status(400).send(err));
    }

};