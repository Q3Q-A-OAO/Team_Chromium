
// This is a stub for n8n webhook integration.

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

/**
 * Posts an event to the configured n8n webhook URL.
 * If the URL is not set in the environment variables, it will log a message
 * to the console and perform no action.
 *
 * @param eventType A string identifying the event (e.g., 'student.attempt.summary').
 * @param payload The data to send with the event.
 */
export const postToN8n = async (eventType: string, payload: unknown): Promise<void> => {
  if (!N8N_WEBHOOK_URL) {
    console.log(`n8n webhook not configured. Event '${eventType}' not sent.`, { payload });
    return;
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventType, payload }),
    });

    if (!response.ok) {
      console.error(`Failed to send event to n8n. Status: ${response.status}`);
    } else {
        console.log(`Event '${eventType}' successfully sent to n8n.`);
    }
  } catch (error) {
    console.error('Error sending event to n8n:', error);
  }
};
