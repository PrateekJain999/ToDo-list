const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

const User = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    age: { type: Number },
    gender: { type: String , enum: ['male', 'female']},
    email: { type: String },
    password: {type: String},
    tokens: [{
        token: {
            type: String
        }
    }]
}, {timestamps: true});

module.exports=MONGOOSE.model('users', User);