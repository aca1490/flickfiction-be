import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';

export interface ColorsLambdaProps {
  table: Table;
}

export class ColorsLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: ColorsLambdaProps) {
    super(scope, id, {
      entry: path.join(__dirname, '../../lambda/colors.ts'), // Path to your Lambda function
      handler: 'handler', // The function name that is exported in your Lambda code
      environment: {
        TABLE_NAME: props.table.tableName,
      },
    });

    // Grant Lambda read access to the DynamoDB table
    props.table.grantReadData(this);
  }
}