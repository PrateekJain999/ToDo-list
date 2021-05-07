const express = require('express');
const server = express();
var bodyParser = require('body-parser')
const joiSchema = require('../services/joiValidation');

validation = function(req, res, next){
    console.log(req);
    // joiSchema()
    next()
}

server.use(bodyParser.json())
server.use(validation);

server.get('/',(req, res)=>{
    res.send('hello');
});

module.exports=server;