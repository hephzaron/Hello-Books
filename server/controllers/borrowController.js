const Borrowed = require('../models').Borrowed;
const User = require('../models').User;
const nodemailer = require('nodemailer');
const sendMail = require('../middlewares').sendMail;

function GetAdminMail() {
    return User.find({ where: { admin: true } }, (error, admin) => {
        if (error) throw error('administrator does not exist');
        return (admin.email);
    });
}

module.exports = {

    //allow users to borrow book
    create(req, res) {
        return Borrowed
            .create({
                userId: req.params.userId,
                bookId: req.params.bookId,
                returned: false
            })
            .then(borrow => {
                User.find({ where: { id: req.params.userId } }, function(error, user) {
                    if (error) throw error;
                    let userEmail = user.email; //get user email
                    let adminEmail = GetAdminMail(); // get admin email
                    if (adminEmail && userEmail) {
                        sendMail.borrowMail(adminEmail);
                    }

                });

                res.status(201).send(borrow);
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