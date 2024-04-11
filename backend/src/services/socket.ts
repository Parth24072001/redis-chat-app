// import { Server } from "socket.io";
// import Redis from "ioredis";
// import prismaClient from "./prisma";
// import { createProducer, produceMessage } from "./kafka";
// import dotenv from "dotenv";

// // Load environment variables from .env file
// dotenv.config();

// const getEnvVar = (name: any, defaultValue: any) => {
//   return process.env[name] !== undefined ? process.env[name] : defaultValue;
// };

// const redisHost = getEnvVar("REDIS_HOST", "localhost");
// const redisPort = parseInt(getEnvVar("REDIS_PORT", "6379"));
// const redisUsername = getEnvVar("REDIS_USERNAME", "");
// const redisPassword = getEnvVar("REDIS_PASSWORD", "");

// // Create Redis clients
// const pub = new Redis({
//   host: redisHost,
//   port: redisPort,
//   username: redisUsername,
//   password: redisPassword,
// });

// const sub = new Redis({
//   host: redisHost,
//   port: redisPort,
//   username: redisUsername,
//   password: redisPassword,
// });

// // Now you can use the pub and sub Redis clients for publishing and subscribing

// class SocketServices {
//   private _io: Server;

//   constructor() {
//     this._io = new Server({
//       cors: {
//         allowedHeaders: ["*"],
//         origin: "*",
//       },
//     }); // Instantiate Server class
//     sub.subscribe("MESSAGES");
//   }

//   public initListeners() {
//     const io = this.io;
//     console.log("init socket listners...");
//     io.on("connect", async (socket) => {
//       console.log("new socket Connected", socket.id);

//       socket.on("event:message", async ({ message }: { message: string }) => {
//         console.log("new message rec.", message);

//         await pub.publish("MESSAGES", JSON.stringify({ message }));
//       });
//     });
//     sub.on("message", async (channel, message) => {
//       if (channel === "MESSAGES") {
//         io.emit("message", { message });
//         await produceMessage(message);
//         console.log("message produce to kafka brocker");
//       }
//     });
//   }
//   get io() {
//     return this._io;
//   }
// }
// export default SocketServices;
