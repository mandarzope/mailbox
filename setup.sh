#!/usr/bin/env bash

# A few bash commands to make development against dev environment easy.
# Set the properties below to sensible values for your project.

# The name of your CloudFormation stack.  Two developers can share a stack by
# sharing this value, or have their own with different values.
STACK_NAME="mailbox"
# The name of an S3 bucket on your account to hold deployment artifacts.
# AWS_ACCESS_KEY_ID="AKIA3Q5VXRQ3GWVYAB6M"
# AWS_SECRET_ACCESS_KEY="J+3QdV51tSj9MFLrybMgjYzUtKi9GwhxtAoICFst"
# REGION can only be from 
# us-east-1
# us-west-2
# eu-west-1
# us-east-1
# us-west-2
# eu-west-1
REGION="us-east-1"
OUTPUT="json"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile mailbox
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile mailbox
aws configure set region $REGION --profile mailbox
aws configure set output $OUTPUT --profile mailbox

AWS_PROFILE_NAME="mailbox"

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text --profile $AWS_PROFILE_NAME)
SAM_BUCKET=sam-$REGION-$AWS_ACCOUNT_ID
echo $SAM_BUCKET

STACKS=$(aws cloudformation describe-stacks --stack-name mailapiseed --profile=$AWS_PROFILE_NAME --output text);

if [[ "$STACKS" =~ ^STACKS.* ]]; 
then
    echo "Update Not Required"
    # aws cloudformation update-stack --stack-name mailapiseed --template-body file://serverless/serverless.seed.json  --profile $AWS_PROFILE_NAME
    # aws cloudformation wait stack-update-complete  --stack-name mailapiseed  --profile $AWS_PROFILE_NAME
else
    echo "Creating mailapiseed stack"
    aws cloudformation create-stack --stack-name mailapiseed --template-body file://serverless/serverless.seed.json  --capabilities=CAPABILITY_NAMED_IAM --profile $AWS_PROFILE_NAME
    aws cloudformation wait stack-create-complete  --stack-name mailapiseed  --profile $AWS_PROFILE_NAME
fi

DIR=$PWD;
cd "$DIR/serverless/seed"
for d in */ ; do
    echo "$DIR/serverless/seed/$d"
    cd "$DIR/serverless/seed/$d"
    FUNCTION_NAME=${PWD##*/}
    zip -r code.zip .
    aws s3 cp code.zip s3://$SAM_BUCKET/$FUNCTION_NAME.zip --profile=$AWS_PROFILE_NAME
    rm code.zip
    echo "Done uploading $FUNCTION_NAME"
done

npm run build:serverless
cd "$DIR/serverless/dist"
for d in */ ; do
    cd "$DIR/serverless/dist/$d"
    FUNCTION_NAME=${PWD##*/}
    zip -r code.zip .
    aws s3 cp code.zip s3://$SAM_BUCKET/$FUNCTION_NAME.zip --profile=$AWS_PROFILE_NAME
    rm code.zip
    echo "Done uploading $FUNCTION_NAME"
done
cd "$DIR"

STACKS=$(aws cloudformation describe-stacks --stack-name mailapi --profile=$AWS_PROFILE_NAME --query 'Stacks[*].[StackName, StackStatus]' --output text);
if [[ "$STACKS" =~ ^mailapi* ]];  
then
    STACK_STATUS=$(echo $STACKS | cut -f2 -d ' ')
    if [[ "$STACK_STATUS" == "ROLLBACK_COMPLETE" ]];
    then
        aws cloudformation delete-stack --stack-name mailapi --profile=$AWS_PROFILE_NAME
        aws cloudformation wait stack-delete-complete --stack-name mailapi  --profile $AWS_PROFILE_NAME
        aws cloudformation create-stack --stack-name mailapi --template-body file://serverless/serverless.json  --profile $AWS_PROFILE_NAME --capabilities CAPABILITY_NAMED_IAM
        aws cloudformation wait stack-create-complete --stack-name mailapi  --profile $AWS_PROFILE_NAME
    else
        aws cloudformation update-stack --stack-name mailapi --template-body file://serverless/serverless.json --profile=$AWS_PROFILE_NAME
        aws cloudformation wait stack-update-complete  --stack-name mailapi   --profile $AWS_PROFILE_NAME
    fi
else
    aws cloudformation create-stack --stack-name mailapi --template-body file://serverless/serverless.json  --profile $AWS_PROFILE_NAME --capabilities CAPABILITY_NAMED_IAM
    aws cloudformation wait stack-create-complete --stack-name mailapi  --profile $AWS_PROFILE_NAME
fi