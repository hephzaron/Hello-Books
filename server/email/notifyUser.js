/**Query database every 24hours and notify user if time is up to returned borrowed books */
let path = require('path');
const tempdir = path.join(__dirname, './template/reminder.ejs');
const sendEmail = require('./sendMail').sendEmail;
const Borrowed = require('../models').Borrowed;
const User = require('../models').User;
const Book = require('../models').Book;



//check database every 24 hours
let refresh = 24 * 60 * 60 * 1000;

function sendReminder() {
    setInterval(loop, refresh);
}

function loop() {

    //query database to get all unreturned books 
    return Borrowed.findAll({
        where: {
            returned: false
        }
    }).then(borrow => {

        return borrow.map(function(borrow) {
            let userId = borrow.userId;
            let bookId = borrow.bookId;
            let updatedAt = borrow.updatedAt;
            let now = new Date();
            let duration = now - updatedAt;
            let expire = 7 * refresh; //user has 7 days to return 

            //get user details where book ought to have been returned but still with the user
            if (duration >= expire) {
                return User.findById(userId).then(user => {

                    let username = user.username;
                    return Book.findById(bookId).then(book => {
                        let userEmail = user.email;
                        let bookTitle = book.title;
                        let data = {
                            user: username,
                            book: bookTitle,
                            date: updatedAt
                        };

                        if (duration >= expire) {
                            sendEmail(userEmail, tempdir, data, 'Return Book');
                        }

                    });


                });
            }

        });
    });
}

exports.sendReminder = sendReminder;