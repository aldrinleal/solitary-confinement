#!/usr/bin/env node

// Reads the yaml files and maps the pages with the results - by compiling the yaml files into javascript functions
//
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

    // Read and parse the yaml files files
    var files = fs.readdirSync(dataDir, {
        encoding: 'utf8'
    })

    _.forEach(files, (filename) => {
        var k = path.basename(filename, '.yml')
        var abspath = path.join(dataDir, filename)

        try {
            var content = fs.readFileSync(abspath, "utf8")

            var doc = yaml.safeLoad(content)

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
	// compile the yml content into javascript functions
        var subFunc = functionGenerator.buildFunction(intentName, intentMeta)
        
        if (endsWith(intentName, 'Intent')) {
            app.intent(intentName, {}, subFunc(app))
        }


	// store the actionmap (required for the main interaction loop)
        
        actionMap[intentName] = subFunc(app)
    })
    
    return actionMap
}

module.exports = exports;
