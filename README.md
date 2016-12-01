# solitary confinement

A proof of concept of a navigating "Build your own Adventure" Lambda ASK Skill

## Installing

1. Register an app on the developer.amazon.com. Copy the application id
2. Edit package.json and replace with the application id obtained in the previous step.
3. Install awscli
4. Set the environment variables (or ``aws configure``)
5. On AWS, pick a bucket and an IAM Role for Lambda (the default ``lambda-basic-execution`` role is just fine)
6. Review and edit deploy.sh
7. npm install ; ./deploy.sh
8. Edit the sc_lambda function and add a trigger to ASK. 
9. Copy the ARN and edit on the developer.amazon.com website.
10. Here are the intent schema:

```json
{
   "intents": [
      {
         "intent": "PlayIntent",
         "slots": []
      },
      {
        "intent": "ActionIntent",
        "slots": [ 
          {
            "name": "number", 
            "type": "AMAZON.NUMBER"
          }
        ]
      }
   ]
}
```

and sample utterances:

```
PlayIntent play
ActionIntent {number}
```
