import { Producer, Kafka } from "kafkajs";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import prismaClient from "./prisma";

dotenv.config();

const getEnvVar = (name: any, defaultValue: any) => {
  return process.env[name] !== undefined ? process.env[name] : defaultValue;
};

// Get environment variables with defaults or handle undefined case
const clientId = getEnvVar("KAFKA_CLIENT_ID", "my-app");
const brokers = getEnvVar("KAFKA_BROKERS", "localhost:9092");
const caFile = getEnvVar("KAFKA_CA_FILE", "./ca.pem");
const username = getEnvVar("KAFKA_USERNAME", "");
const password = getEnvVar("KAFKA_PASSWORD", "");

const kafka = new Kafka({
  clientId: clientId,
  brokers: [brokers],
  ssl: {
    ca: [fs.readFileSync(path.resolve(caFile), "utf-8")],
  },
  sasl: {
    username: username,
    password: password,
    mechanism: "plain",
  },
});
let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
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

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;
      console.log(`New Message Recv..`);
      try {
        await prismaClient.message.create({
          data: {
            text: message.value?.toString(),
          },
        });
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
