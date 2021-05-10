require('dotenv').config();
const EXPRESS = require("express");
const app = EXPRESS();
const ch = require('chalk');
const port = process.env.PORT || 4000;

const server = require('http').Server(app);

let startNodeserver = async () => {
    await require('./app/startup/expressStartup')(app);

    return new Promise((resolve, reject) => {
        server.listen(port, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

startNodeserver().then(() => {
    console.log(ch.green('Node server running on 4000'));
}).catch((err) => {
    console.log(ch.red(`Error in starting server ${err}`));
    process.exit(1);
});