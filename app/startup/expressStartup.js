"use strict";

const express = require('express');
const userRoutes = require('../routes/userRoute');
const noteRoutes = require('../routes/noteRoute');

module.exports = async function (app) {

    app.use(require("body-parser").json());
    app.use(userRoutes);
    app.use(noteRoutes);

    // initialize mongodb 
    await require('./db_mongo')();
};
