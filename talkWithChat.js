const { apiKey, organization } = require('keys.js');
const { Configuration, OpenAIApi } = require('openai');


// Initialize the Configuration and OpenAIApi instances
const configuration = new Configuration({ apiKey, organization });
const openai = new OpenAIApi(configuration);

// Function to send a message to the ChatGPT API
async function sendMessage(conversationId, parentMessageId, message) {
  try {
    // Use the OpenAI library to call the ChatGPT API
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
      conversationId,
      parentId: parentMessageId // Include the parentMessageId for continuity
    });

    // Extract and return the generated message from the API response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to send message to ChatGPT API:', error);
    return null;
  }
}

// Function to start the conversation loop
async function startConversation() {
  console.log('Welcome to ChatGPT! Type your message or "exit" to quit.');

  // Keep reading input from console until "exit" is entered
  while (true) {
    // Use a Promise to read input from console
    const input = await new Promise((resolve) => {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('> ', (input) => {
        rl.close();
        resolve(input);
      });
    });

    // Check if user wants to exit
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      return;
    }

    // Send user's message to ChatGPT API
    const response = await sendMessage(input);

    // Print the generated response
    console.log('ChatGPT:', response);
  }
}

// Start the conversation loop
startConversation().catch((error) => console.error(error));
