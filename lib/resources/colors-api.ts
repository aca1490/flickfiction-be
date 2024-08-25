import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { Function } from 'aws-cdk-lib/aws-lambda';

export interface ColorsApiProps {
  handler: Function;
}

export class ColorsApi extends apigateway.RestApi {
  constructor(scope: Construct, id: string, props: ColorsApiProps) {
    super(scope, id, {
      restApiName: 'Colors Service',
    });

    const getColorsIntegration = new apigateway.LambdaIntegration(props.handler);

    // Define the /colors endpoint
    this.root.addResource('colors').addMethod('GET', getColorsIntegration);
  }
}
