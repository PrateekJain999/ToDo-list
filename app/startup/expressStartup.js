"use strict";

const express = require('express');
const userRoutes = require('../routes/userRoute');

module.exports = async function (app) {

    app.use(require("body-parser").json());
    app.use(userRoutes);

    // initialize mongodb 
    await require('./db_mongo')();
};
