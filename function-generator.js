#!/usr/bin/env node

'use strict';

module.change_code = 1;

var exports = module.exports = {};

const handlebars = require('handlebars'),
    fs = require('fs');

/**
 * Declare handlebars and register the increment function in order to use 1-based indexes
 *
 * Pro tip: Read misc/function.handlebars
 */

const template = handlebars.compile(fs.readFileSync(__dirname + '/misc/function.handlebars', 'utf8'));

handlebars.registerHelper("inc", (value, options) => {
    return parseInt(value) + 1;
});

exports.buildFunction = (intentName, intentMeta) => {
    console.log(intentName, intentMeta)

    /* Builds the function source code */

    var sourceCode = template({
        page: intentName,
        meta: intentMeta
    /* Compiles it */

    /*jslint evil: true */
    return new Function('app', sourceCode);
}
