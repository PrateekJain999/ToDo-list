const MONGOOSE = require('mongoose');
const BCRYPT = require("bcrypt");
const JWT = require("jsonwebtoken");

let commonFunctions = {};

commonFunctions.hashPassword = (payloadString) => {
  return BCRYPT.hashSync(payloadString, 10);
};

commonFunctions.compareHash = (payloadPassword, userPassword) => {
  return BCRYPT.compareSync(payloadPassword, userPassword);
};

commonFunctions.encryptJwt = (payload) => {
  let token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

commonFunctions.decryptJwt = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
}


module.exports = commonFunctions;

