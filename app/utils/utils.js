const MONGOOSE = require('mongoose');
const BCRYPT = require("bcrypt");
const JWT = require("jsonwebtoken");

let commonFunctions = {};

commonFunctions.hashPassword = (payloadString) => {
  const salt = BCRYPT.genSaltSync(8);
  return BCRYPT.hashSync(payloadString, salt);
};

commonFunctions.compareHash = (payloadPassword, userPassword) => {
  return BCRYPT.compareSync(payloadPassword, userPassword);
};


// commonFunctions.convertIdToMongooseId = (stringId) => {
//   return MONGOOSE.Types.ObjectId(stringId);
// };

commonFunctions.encryptJwt = (payload) => {
  let token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

commonFunctions.decryptJwt = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
}

// commonFunctions.sendEmail = async (userData, type) => {
//   const transporter = require('nodemailer').createTransport(CONFIG.SMTP.TRANSPORT);
//   const handleBars = require('handlebars');
//   /** setup email data with unicode symbols **/
//   const mailData = commonFunctions.emailTypes(userData, type), email = userData.email;
//   let template = handleBars.compile(mailData.template);

//   let result = template(mailData.data);

//   let emailToSend = {
//     to: email,
//     from: CONFIG.SMTP.SENDER,
//     subject: mailData.Subject,
//     html: result
//   }
//   return await transporter.sendMail(emailToSend);
// };


module.exports = commonFunctions;

