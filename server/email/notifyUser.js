/**Query database every 24hours and notify user if time is up to returned borrowed books */

const sendMail = require('./sendMail').sendMail;
const Borrowed = require('../models').Borrowed;
const User = require('../models').User;


//check database every 24 hours
//let refresh = 24 * 60 * 60 * 1000;
let refresh = 5000;

function sendReminder() {
    //console.log(typeof(loop));
    setInterval(loop, refresh);
}

function loop() {

    //query database to get all unreturned books 
    return Borrowed.findAll({
        where: {
            returned: false
        }
    }).then((error, books) => {
        if (error) { throw error; }
        console.log(books);
        /*
                // calculate elapsed time for every book yet to be returned
                return books.map(function(borrow) {
                    let userId = borrow.userId;
                    let updatedAt = borrow.updatedAt;
                    let now = new Date();
                    let duration = now - updatedAt;
                    let expire = 7 * refresh; //user has 7 days to return book

                    //get user details where book ought to have been returned but still with the user
                    if (duration >= expire) {
                        return User.find({ where: { id: userId } }, (function(user) {
                            let userEmail = user.email;
                            let userData = {
                                name: user.username,
                                book: borrow.getBooks()
                            };
                            let date = borrow.updatedAt;

                            return sendMail(userEmail, userData, date); //send reminder mail to user
                        }));
                    }

                });
        */
    });

}
sendReminder();

exports.sendReminder = sendReminder;