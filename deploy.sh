#!/bin/bash

set -x

BUCKET=ingenieux-images
KEY=/sc/sc.zip
ROLE_NAME=lambda_basic_execution

function lookup_role {
  ROLE=$(aws iam list-roles | jq -r .[][].Arn | grep role/$ROLE_NAME)

  if [ "x" == "x$ROLE" ]; then
    echo "Role name not found: $ROLE_NAME"
    exit 1
  else
    echo $ROLE
  fi
}

ROLE=$(lookup_role $ROLE_NAME)

function deploy_function_code {
  FUNCTION_NAME=$1
  FUNCTION_HANDLER=$2
  FUNCTION_ROLE=$3

  aws lambda update-function-code --function-name $FUNCTION_NAME --s3-bucket $BUCKET --s3-key $KEY ||
    aws lambda create-function --function-name $FUNCTION_NAME --runtime nodejs4.3 --role $FUNCTION_ROLE --handler $FUNCTION_HANDLER --code S3Bucket=$BUCKET,S3Key=$KEY --timeout 60 --memory-size 128
}

zip -r /tmp/sc.zip .

aws s3 cp /tmp/sc.zip s3://$BUCKET/$KEY

deploy_function_code sc_lambda alexa.handler $ROLE
