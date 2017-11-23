let path = require('path');
const tempdir = path.join(__dirname, './template/admin-info.ejs');
const Users = require('../../server/models').User;
const sendEmail = require('./sendMail').sendEmail;

function mailAdmin(data) {
    return Users.findAll({ where: { admin: true } }).then(admins => {
        return admins.map(function(admin) {
            let adminEmail = admin.email;
            let borrowDetails = {
                admin: admin.username,
                username: data.username,
                userEmail: data.email,
                book: data.bookTitle,
                catalog: data.genre.dataValues.name,
                date: data.date
            };
            return sendEmail(adminEmail, tempdir, borrowDetails, 'Borrowed Books');
        });
    });
}
exports.mailAdmin = mailAdmin;