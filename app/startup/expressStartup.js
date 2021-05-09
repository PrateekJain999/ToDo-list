"use strict";

const express = require('express');
const {userRoutes, noteRoutes} = require('../routes/index');

module.exports = async function (app) {

    app.use(require("body-parser").json());
    app.use(userRoutes);
    app.use(noteRoutes);

    // initialize mongodb 
    await require('./db_mongo')();
};
