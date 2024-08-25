import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ColorsTable } from '../resources/colors-table';
import { ColorsLambda } from '../resources/colors-lambda';
import { ColorsApi } from '../resources/colors-api';

export class FlickFictionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the DynamoDB table
    const colorsTable = new ColorsTable(this, 'ColorsTable');

    // Create the Lambda function
    const colorsLambda = new ColorsLambda(this, 'ColorsLambdaHandler', {
      table: colorsTable,
    });

    // Create the API Gateway
    new ColorsApi(this, 'ColorsApi', {
      handler: colorsLambda,
    });
  }
}
