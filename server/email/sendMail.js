const nodemailer = require('nodemailer');
const ejs = require('ejs');

function sendEmail(email, tempdir, templateData, subject) {
    let transport = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            user: 'hephzaron@gmail.com',
            pass: 'sharon123'
        }
    });
    ejs.renderFile(tempdir, templateData, function(error, html) {
        if (error) console.log(error);
        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Power Library 👻" <tobi_daramola@yahoo.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: html // html body
        };
        // send mail with defined transport object
        return transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return console.log('Message sent: %s', info.response);

        });


    });



}
//sendMail();
exports.sendEmail = sendEmail;