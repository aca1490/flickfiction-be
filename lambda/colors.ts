import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';


const dynamoDbClient = new DynamoDBClient();

exports.handler = async (event: any) => {
  const params = {
    TableName: process.env.TABLE_NAME,
  };

  try {
    // Perform the scan operation
    const data = await dynamoDbClient.send(new ScanCommand(params));
    
    // Convert DynamoDB items to plain JavaScript objects
    const colors = (data.Items || []).map(item => unmarshall(item));

    return {
      statusCode: 200,
      body: JSON.stringify(colors),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve colors' }),
    };
  }
};