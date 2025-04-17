import pool from '../config/db';
import { formatResponse } from '../utils';
import { updateTask as updateTaskService } from '../services/taskService';

export const updateTask = async (event: any): Promise<any> => {
  try {
    const taskId = event.pathParameters?.id;

    if (!taskId) {
      return formatResponse(400, 'Task ID is required');
    }

    const body = JSON.parse(event.body || '{}');

    await updateTaskService(taskId, body);

    return formatResponse(200, `Task with ID ${taskId} updated successfully`);
  } catch (error) {
    return formatResponse(500, 'Error updating task', null, error as Error);
  }
};
