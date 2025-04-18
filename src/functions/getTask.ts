import { formatResponse } from '../utils';
import { getTaskById } from '../services/taskService';
import { validateTaskInput } from '../utils';
export const getTask = async (event: any): Promise<any> => {
  try {
    const taskId = event.pathParameters?.id;
    const userId = event.requestContext.authorizer?.userId;
    const validationError = validateTaskInput({taskId, userId});
    if (validationError) {
      return formatResponse(400, validationError);
    }
    const task = await getTaskById(taskId, userId);
    if (!task) {
      return formatResponse(404, 'Task not found');
    }
    if (task.userId != userId) {
      return formatResponse(403, 'You do not have permission to access this task');
    }
    return formatResponse(200, 'Task retrieved successfully', task);
  } catch (error) {
    const typedError = error as Error;
    if (typedError.message === 'Task not found') {
      return formatResponse(404, typedError.message);
    }
    return formatResponse(500, 'Error retrieving task', null, typedError);
  }
};