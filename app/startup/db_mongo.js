const mongoose = require('mongoose');
const ch = require('chalk')

module.exports = async () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log(ch.green('Mongo connected at mongo atlas'));
};