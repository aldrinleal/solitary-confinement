#!/usr/bin/env node

'use strict'

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('solitaryconfinement');

app.launch(function(request,response) {
  response
    .say('Welcome to Solitary Confinement. Say \'play\' to start a new game.')
    .shouldEndSession(false)
    ;
  
  response.card('Solitary Confinement', 'Welcome! Say \'play\' to start a new game.');
});

/*

app.intent('PlayIntent', {
    "utterances": [ "play" ]
}, function(request, response) {
    response
        .say("You woke up in a cell. There's nothing to see.")
        .shouldEndSession(false)
        ;
})*/

require('./history-model').build(app)

module.exports = app;

if (require.main === module) {
    console.log(app.schema())
}