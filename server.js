require('dotenv').config();
const EXPRESS = require("express");
const app = EXPRESS();

const server = require('http').Server(app);

let startNodeserver = async () => {
    await require('./app/startup/expressStartup')(app);

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