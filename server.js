const mong = require('mongoose');
require('dotenv').config();

mong.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

let startNodeserver = async () => {
    server = await require('./app/routes/userRoute');

    return new Promise((resolve, reject) => {
        server.listen(4000, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

startNodeserver().then(() => {
    console.log('Node server running on 4000');
}).catch((err) => {
    console.log('Error in starting server', err);
    process.exit(1);
});