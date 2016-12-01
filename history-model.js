#!/usr/bin/env node

'use strict';

module.change_code = 1;

var exports = module.exports = {};

const
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    yaml = require('js-yaml'),
    functionGenerator = require('./function-generator');

const dataDir = path.join(__dirname, 'data')

var loadData = () => {
    var data = {}

    var files = fs.readdirSync(dataDir, {
        encoding: 'utf8'
    })

    _.forEach(files, (filename) => {
        var k = path.basename(filename, '.yml')
        var abspath = path.join(dataDir, filename)

        //console.log('Loading', k, 'from', abspath)

        // Get document, or throw exception on error
        try {
            var content = fs.readFileSync(abspath, "utf8")

            var doc = yaml.safeLoad(content)

            //console.log('k:', k, 'doc', doc)

            data[k] = doc
        } catch (e) {
            throw e;
        }
    })

    return data
}

var endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


exports.build = function(app) {
    var data = loadData()
    
    var actionMap = {}

    _.forEach(data, (intentMeta, intentName) => {
        var subFunc = functionGenerator.buildFunction(intentName, intentMeta)
        
        if (endsWith(intentName, 'Intent')) {
            app.intent(intentName, {}, subFunc(app))
        }
        
        actionMap[intentName] = subFunc(app)
    })
    
    return actionMap
}

module.exports = exports;

if (require.main === module) {
    // _.forEach(data, function(k, v) {
    //     console.log('k:', k, 'v:', v)
    // })

    //console.log(app.schema())
} else {}
