import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dbClient";

export const handle: APIGatewayProxyHandler = async(event) => {
  const { id } = event.pathParameters;
  
  const response = await document.query({
    TableName: 'users_todos',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    }
  }).promise();

  const todos = response.Items;

  if(!todos){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "user not found",
      }),
      headers: {
        "Content-type" : "application/json",
      }
    }
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}
