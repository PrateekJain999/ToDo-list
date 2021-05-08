const nodemailer = require("nodemailer");

const sendMail = async function({name, to, text, subject}) {

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"✔ ToDo List ✔" <prateek.jain@chicmic.co.in>', // sender address
    to: to, // list of receivers
    subject: `👻 ${subject} ${name}👻`, // Subject line
    text: `${text}`, // plain text body
    html: "<a href='https://cooltext.com'><img src='https://images.cooltext.com/5527407.png' width='659' height='135' alt='@PK9997481571' /></a>", // html body
  });
}

module.exports = sendMail;