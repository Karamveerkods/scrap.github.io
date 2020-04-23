const fs = require('fs');
const hbs = require('hbs');
const express = require('express');
const routes = require('require-dir')();

module.exports = function(app) {
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    Object.keys(routes).forEach(function(routeName) {
        var router = express.Router();
        require('./' + routeName)(router);
        app.use('/' + routeName, router);
    });
}