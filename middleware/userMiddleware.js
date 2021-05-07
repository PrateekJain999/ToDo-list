const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const joiSchema = require('../services/joiValidation');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const joiValidation = function (req, res, next) {
    req.body.gender = req.body.gender.toLowerCase();

    const data = joiSchema.validate(req.body);

    if (data.error) {
        res.end(data.error.message);
    }
    else {
        next();
    }
}

module.exports = {
    auth,
    joiValidation
}