# solitary confinement

A proof of concept of a navigating "Build your own Adventure" Lambda ASK Skill

## Installing

1. Install awscli
2. Set the environment variables (or ``aws configure``)
3. On AWS, pick a bucket and an IAM Role for Lambda (the default ``lambda-basic-execution`` role is just fine)
4. Review and edit deploy.sh
5. npm install ; ./deploy.sh
6. Edit the sc_lambda function and add a trigger to ASK. 
7. Copy the ARN and edit on the developer.amazon.com website.
8. Here are the intent schema:

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
