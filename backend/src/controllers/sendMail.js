const nodemailer = require('nodemailer');

function sendMail(toUser, emailText){

    var transporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
        user: 'lalaf97@mail.ru',
        pass: 'kapopova273'
    }
    });

    var mailOptions = {
    from: 'lalaf97@mail.ru',
    to: toUser,
    subject: 'E-mail Confirmation from application',
    text: emailText
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Somethimg happen!!!!!!!!!!!!!!!!!!',error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = sendMail;