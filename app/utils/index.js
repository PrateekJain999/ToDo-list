/********************************
 **** Managing all the utils services ***
 ********* independently ********
 ********************************/
 module.exports = {
    sendMail: require('./emailService'),
    joiSchema: require('./joiSchema'),
    commonFunctions: require('./utils')
};