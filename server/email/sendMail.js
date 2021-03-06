const nodemailer = require('nodemailer');
const ejs = require('ejs');
const gmail = process.env.GMAIL_ENV;
const password = process.env.GMAIL_PASSWORD;

function sendEmail(email, tempdir, templateData, subject) {
    let transport = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            user: gmail,
            pass: password
        }
    });
    ejs.renderFile(tempdir, templateData, function(error, html) {
        if (error) console.log(error);
        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Power Library 👻" <library mail>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: html // html body
        };
        // send mail with defined transport object
        return transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message); //getaddrinfo ENOENT smtp.gmail.com:465
            }
            return console.log('Message sent: %s', info.response);

        });
    });
}
exports.sendEmail = sendEmail;