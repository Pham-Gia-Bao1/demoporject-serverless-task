import pool from '../config/db';
import { formatResponse } from '../utils';
import { createTask as createTaskService } from '../services/taskService';
import { validateTaskInput } from '../utils';

export const createTask = async (event: any): Promise<any> => {
  try {
    const body = JSON.parse(event.body || '{}');

    const validationError = validateTaskInput(body);
    if (validationError) {
      return formatResponse(400, validationError);
    }

    const { title, status, priority, date, userId } = body;
    const taskId = await createTaskService({ title, status, priority, date, userId });

    return formatResponse(201, 'Task created successfully!', { taskId });
  } catch (error) {
    return formatResponse(500, 'Error creating task', null, error as Error);
  }
};
