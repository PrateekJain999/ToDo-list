const mongoose = require('mongoose');

module.exports = async () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log('Mongo connected at ', process.env.MONGO_URL);
};