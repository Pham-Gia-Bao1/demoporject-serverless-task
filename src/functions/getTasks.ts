import { APIGatewayProxyHandler } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { getTasksByUserId } from '../services/taskService';
import { formatResponse } from '../utils';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const getTasks: APIGatewayProxyHandler = async (event) => {
  try {
    // Lấy token từ headers
    const authHeader = event.headers.Authorization || event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return formatResponse(403, 'Unauthorized: Missing or invalid token');
    }
    const token = authHeader.replace('Bearer ', '');
    // Giải mã token để lấy userId
    let decoded: any;
    try {
      decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string);
    } catch (err) {
      return formatResponse(403, 'Unauthorized: Invalid token', null, err as Error);
    }
    const userId = decoded.id;
    // Gọi service để lấy danh sách tasks
    const tasks = await getTasksByUserId(userId);
    if (!tasks || tasks.length === 0) {
      return formatResponse(404, 'No tasks found for the authenticated user');
    }
    return formatResponse(200, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    return formatResponse(500, 'Error retrieving tasks', null, error as Error);
  }
};