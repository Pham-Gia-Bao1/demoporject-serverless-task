import AWS from 'aws-sdk';
import { formatResponse } from '../utils';
import { createTask as createTaskService } from '../services/taskService';
import { validateTaskInput } from '../utils';

const sns = new AWS.SNS({ region: 'us-west-2' }); // SNS client

export const createTask = async (event: any): Promise<any> => {
  try {
    const body = JSON.parse(event.body || '{}');
    const validationError = validateTaskInput(body);
    if (validationError) {
      return formatResponse(400, validationError);
    }

    const { title, status, priority, date, userId } = body;
    const taskId = await createTaskService({ title, status, priority, date, userId });

    const message = JSON.stringify({
      taskId,
      title,
      status,
      priority,
      date,
      userId,
      eventType: "TaskCreating",
      source: "taskService"
    });

    const params: AWS.SNS.PublishInput = {
      Message: message,
      TopicArn: 'arn:aws:sns:us-west-2:499090204996:ZohoSNS' // assuming this is a standard topic
    };
    

    await sns.publish(params).promise();
    console.log("✅ SNS message published:", message);

    return formatResponse(201, 'Task created successfully!', { taskId });
  } catch (error) {
    console.error("❌ Error:", error);
    return formatResponse(500, 'Error creating task', null, error as Error);
  }
};
