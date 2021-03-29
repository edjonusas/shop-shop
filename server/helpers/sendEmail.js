const nodemailer = require('nodemailer');
const htmlTemplates = require('./htmlTemplates')

function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.sendMail(options, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



module.exports = {
  passwordRecover: (email, password) => {
    const mailOptions = {
      from: 'myshop@gmail.com',
      to: email,
      subject: 'New Password Generated',
      text: htmlTemplates.passwordRecover(password)
    };
    sendEmail(mailOptions)
  },

  orderMade: (email, order) => {
    const mailOptions = {
      from: 'myshop@gmail.com',
      to: email,
      subject: 'Order made',
      text: 'Here is your order info' + order
    };
    sendEmail(mailOptions)
  }
}
