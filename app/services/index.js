/********************************
 **** Managing all the services ***
 ********* independently ********
 ********************************/
module.exports = {
    userService: require('./Todo/userService'),
    noteService: require('./Todo/noteService')
};