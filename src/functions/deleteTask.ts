import {formatResponse} from '../utils';
import { deleteTaskById } from '../services/taskService';

export const deleteTask = async (event: any): Promise<any> => {
  try {
    const taskId = event.pathParameters?.id;

    if (!taskId) {
      return formatResponse(400, 'Task ID is required');
    }

    // Validate taskId format (e.g., ensure it's a valid UUID or numeric ID)
    const idValidationRegex = /^[a-fA-F0-9-]+$/; // Example for UUID validation
    if (!idValidationRegex.test(taskId)) {
      return formatResponse(400, 'Invalid Task ID format');
    }

    await deleteTaskById(taskId);

    return formatResponse(200, `Task with ID ${taskId} deleted successfully`);
  } catch (error) {
    return formatResponse(500, 'Error deleting task', null, error as Error);
  }
};