import pool from '../config/db';
import { formatResponse } from '../utils';
import { updateTask as updateTaskService } from '../services/taskService';
import { validateTaskInput } from '../utils';

export const updateTask = async (event: any): Promise<any> => {
  try {
    const taskId = event.pathParameters?.id;
    const validationError = validateTaskInput({taskId});
    if (validationError) {
      return formatResponse(400, validationError);
    }
    const body = JSON.parse(event.body || '{}');
    const validationErrorBody = validateTaskInput(body);
    if (validationErrorBody) {
      return formatResponse(400, validationErrorBody);
    }
    await updateTaskService(taskId, body);
    return formatResponse(200, `Task with ID ${taskId} updated successfully`);
  } catch (error) {
    return formatResponse(500, 'Error updating task', null, error as Error);
  }
};
