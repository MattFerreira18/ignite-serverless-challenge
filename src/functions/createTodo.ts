import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from 'uuid';
import { document } from "../utils/dbClient";

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async(event) => {
  const { userId } = event.pathParameters;
  const { title, deadline } = event.body as unknown as ICreateTodo;

  await document.put({
    TableName: 'users_todos',
    Item: {
      id: uuid(),
      user_id: userId,
      title,
      deadline: new Date(deadline),
      done: false,
    }
  }).promise();


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'todo created with successfully'
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}
