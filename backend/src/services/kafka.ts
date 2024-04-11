import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092", "kafka2:9092"],
});

export async function createProducer() {
  console.log("here");
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGES",
  });
  return true;
}

export async function startMessageConsumer() {
  console.log("Consumer is running..");
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

  // await consumer.run({
  //   autoCommit: true,
  //   eachMessage: async ({ message: kafkaMessage }) => {
  //     if (!kafkaMessage.value) return;
  //     console.log(`New Message Received..`);

  //     const newMessage = {
  //       sender: "7643645",
  //       content: kafkaMessage.value.toString(),
  //       chat: "647676",
  //     };

  //     try {
  //       let savedMessage = await Message.create(newMessage);
  //       savedMessage = await savedMessage
  //         .populate("sender", "name pic")
  //         .execPopulate();
  //       savedMessage = await savedMessage.populate("chat").execPopulate();
  //       savedMessage = await User.populate(savedMessage, {
  //         path: "chat.users",
  //         select: "name pic email",
  //       });

  //       // Handle further processing or updates
  //     } catch (error) {
  //       console.error("Error processing message:", error);
  //       // Handle the error gracefully, you might want to log it or take other actions
  //     }
  //   },
  // });
}

export default kafka;
