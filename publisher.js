const { PubSub } = require('@google-cloud/pubsub');
const path = require('path');

// Create a pubsub client -----------------------------------
const credFileName = 'pubsub-service.json'
const credFilePath = path.join(__dirname, 'env', credFileName);
const pubSubClient = new PubSub({
  keyFile: credFilePath
});

// Publish a message to a topic
async function publishMessage(topicName, data) {
  const dataBuffer = Buffer.from(data);

  try {
    const msgId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${msgId} published`);
  } catch (err) {
    console.error("Error publishing message:", err.message);
  }
};

publishMessage('topic1', 'Hello pub/sub!');