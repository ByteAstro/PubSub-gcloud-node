const { PubSub } = require('@google-cloud/pubsub');
const path = require('path');

// Create a pubsub client -----------------------------------
const credFileName = 'pubsub-service.json'
const credFilePath = path.join(__dirname, 'env', credFileName);
const pubSubClient = new PubSub({
  keyFile: credFilePath
});

// Listen for messages on a subscription --------------------
async function listenForMessages(topicName) {
  const subscription = pubSubClient.subscription(topicName);

  // Event listener for received messages 
  subscription.on('message', (msg) => {
    console.log("\t\t----- New message -----")
    console.log('id:', msg.id);
    console.log('msg:', msg.data);
    msg.ack(); // Acknowledge the message
  });

  // Event listener for errors
  subscription.on('error', (err) => {
    console.error('Error:', err.message);
  });

  console.log("Listening for messages on subscription:", topicName);
};

listenForMessages('topic1');