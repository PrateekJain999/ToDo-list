const Joi = require('joi');

const joiSchema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required().error(new Error('firstname must be in range (3, 30)')),

    lastname: Joi.string().alphanum().min(3).max(30).required().error(new Error('lastname must be in range (3, 30)')),

    age: Joi.number().min(18).required().error(new Error('age must be greater than 18')),

    gender: Joi.string().valid('male', 'female').error(new Error('gender must be male/female')),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error('password must be in range (3, 30)')),

    repeat_password: Joi.ref('password'),

    email: Joi.string().email().required().error(new Error('invalid email'))
});


module.exports = joiSchema;