#!/usr/bin/env node

'use strict'

module.change_code = 1;

var alexa = require('alexa-app');

var app = new alexa.app('solitaryconfinement');

app.launch(function(request, response) {
    response
        .say('Welcome to Solitary Confinement. Say \'play\' to start a new game.')
        .shouldEndSession(false);

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

var actionMap = require('./history-model').build(app)

app.intent('ActionIntent', {

}, (request, response) => {
    var actionIndex = request.slot("number", "0") + ""
    var choices = JSON.parse(request.session("choices"))

    var invalidAnswer = "0" === actionIndex || (!(actionIndex in choices))

    //console.log(actionIndex, choices, invalidAnswer)

    if (invalidAnswer) {
        var prevAction = request.session("page")

        response.say('Invalid choice.')

        actionMap[prevAction](request, response)

        response.shouldEndSession(false, "We are stil waiting for your answer")


    } else {
        var actionName = choices[actionIndex]

        //console.log(actionName, actionMap[actionName])

        actionMap[actionName](request, response)
    }
})

var lambdaP = !!(
    process.env.LAMBDA_TASK_ROOT ||
    false
)

if (lambdaP) {
    module.exports = app.lambda();
} else {
    module.exports = app;

    if (require.main === module) {
        console.log(app.schema())
    }
}
