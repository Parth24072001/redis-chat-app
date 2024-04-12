import { Kafka, Producer, Partitioners } from "kafkajs";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  await _producer.connect();
  console.log("Producer connected");
  producer = _producer;
  return producer;
}

let consumer: any = null;

export async function createConsumer() {
  if (consumer) return consumer;

  consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: { message: any }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });

  console.log("Consumer connected and subscribed");
  return consumer;
}

export async function produceMessageWithRetry(
  message: string,
  maxRetries: number = 3,
  baseRetryDelay: number = 1000
) {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      const producer = await createProducer();
      await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: "MESSAGES",
      });
      console.log("Message produced successfully");
      return;
    } catch (error) {
      console.error("Error producing message:", error);

      const delay = Math.pow(2, retryCount) * baseRetryDelay;
      await new Promise((resolve) => setTimeout(resolve, delay));
      retryCount++;
    }
  }
  console.error("Failed to produce message after retries.");
}

export async function startMessageConsumer() {
  console.log("Consumer is running..");
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;
      try {
        // await prismaClient.message.create({
        //   data: {
        //     text: message.value?.toString(),
        //   },
        // });
      } catch (err) {
        console.log("Something is wrong");
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: "MESSAGES" }]);
        }, 60 * 1000);
      }
    },
  });
}
export default kafka;
