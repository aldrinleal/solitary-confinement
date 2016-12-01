#!/usr/bin/env node

'use strict'

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('solitaryconfinement');

// Plays the title card
//
app.launch(function(request, response) {
    response
        .say('Welcome to Solitary Confinement. Say \'play\' to start a new game.')
        .shouldEndSession(false);

    response.card('Solitary Confinement', 'Welcome! Say \'play\' to start a new game.');
});

// Load the .yml files and compile em
//
var actionMap = require('./history-model').build(app)

// ... and make it available by means of a main interaction Intent
//
app.intent('ActionIntent', {

}, (request, response) => {
    // Take the user answer
    var actionIndex = request.slot("number", "0") + ""
    // ... and available paths to branch the navigation
    var choices = JSON.parse(request.session("choices"))

    // validates if the choice is a valid one

    var invalidAnswer = "0" === actionIndex || (!(actionIndex in choices))

    if (invalidAnswer) { // its not. replay the current options
        var prevAction = request.session("page")

        response.say('Invalid choice.')

        actionMap[prevAction](request, response)

        response.shouldEndSession(false, "We are stil waiting for your answer")


    } else { // its valid. move to the next action / intent
        var actionName = choices[actionIndex]

        actionMap[actionName](request, response)
    }
})

