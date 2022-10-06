const nodemailer = require('nodemailer');
require('dotenv').config();



let transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: process.env.REACT_APP_EMAIL,
                 pass: process.env.REACT_APP_EMAIL_PASS
             }
     });

     message = {
        from: process.env.REACT_APP_EMAIL,
        to: "austing@mssm.org",
        subject: "I'm Sorry",
        html: "<p>Just testing this</p>"
    }
   transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
   });
