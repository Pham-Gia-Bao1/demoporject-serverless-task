import { formatResponse } from "../utils";
import { deleteTaskById } from "../services/taskService";
import { validateTaskInput } from "../utils";
export const deleteTask = async (event: any): Promise<any> => {
  try {
    const taskId = event.pathParameters?.id;
    const validationError = validateTaskInput({taskId});
    if (validationError) {
      return formatResponse(400, validationError);
    }
    await deleteTaskById(taskId);
    return formatResponse(200, `Task with ID ${taskId} deleted successfully`);
  } catch (error) {
    return formatResponse(500, "Error deleting task", null, error as Error);
  }
};
