import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ColorsTable extends dynamodb.Table {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'color', type: dynamodb.AttributeType.STRING },
      tableName: 'Colors',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}