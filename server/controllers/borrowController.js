const Borrowed = require('../models').Borrowed;
const User = require('../models').User;
const Book = require('../models').Book;
const Genre = require('../models').Genre;
const mailAdmin = require('../email/notifyAdmin').mailAdmin;
const EventEmitter = require('events');
let userData;

class MailEvent extends EventEmitter {}
const mailEvent = new MailEvent();
mailEvent.on('email', () => {
    mailAdmin(userData);
});
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
            .then(borrowedBook => {
                let userId = borrowedBook.userId;
                let bookId = borrowedBook.bookId;
                let date = borrowedBook.createdAt;
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
                        let bookTitle = book.title;
                        let genre = book.genre;
                        userData = {
                            username: username,
                            email: userEmail,
                            bookTitle: bookTitle,
                            genre: genre,
                            date: date
                        };
                        res.status(201).send({
                            message: 'You have successfully borrowed this book',
                            borrowedBook
                        });
                        mailEvent.emit('email');
                    });
                });
            })
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
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
                        message: 'Book Not Found'
                    });
                }
                return books
                    .update({
                        returned: req.body.returned || books.returned
                    })
                    .then(returnedBook => res.status(200).send({
                        message: 'You have succesfully returned this book',
                        returnedBook
                    }))
                    .catch(() => res.status(500).send({
                        message: 'Internal Server Error'
                    }));
            })
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    }
};