import { updateZohoId } from "../services/taskService";

export const handler = async (event : any) => {
    try {
      for (const record of event.Records) {
        const snsMessage = record.Sns.Message;
  
        // Nếu message là JSON string, parse nó
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(snsMessage);
            console.log("📨 Zoho SNS Message:", parsedMessage);
            const { taskId, zohoId } = parsedMessage;
            await updateZohoId(taskId, Number.parseInt(zohoId));
            console.log("✅ Zoho ID updated successfully:", zohoId);
        } catch (e) {
            console.log("📝 Raw Zoho SNS Message:", snsMessage);
        }
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Zoho SNS event processed!' }),
      };
    } catch (error) {
      console.error("❌ Error processing SNS event:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to process SNS event', error }),
      };
    }
  };
  