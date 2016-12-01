#!/usr/bin/env node

'use strict';

module.change_code = 1;

var exports = module.exports = {};

const handlebars = require('handlebars'),
    fs = require('fs');
    
const template = handlebars.compile(fs.readFileSync(__dirname + '/misc/function.handlebars', 'utf8'));


exports.buildFunction = (intentName, intentMeta) => {
    console.log(intentName, intentMeta)
    
    var sourceCode = template({
        intentName: intentName,
        meta: intentMeta
    })
    
    console.log('sourceCode:', sourceCode)
    
    /*jslint evil: true */
    return new Function('app', sourceCode);
}

if (require.main === module) {
    const yaml = require('js-yaml')
    
    var doc = yaml.safeLoad(fs.readFileSync('data/PlayIntent.yml', 'utf8'))
    
    console.log('doc', JSON.stringify(doc, null, 2))

    exports.buildFunction('PlayIntent', doc)
}
