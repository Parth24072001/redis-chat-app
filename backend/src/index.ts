import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Redis from "ioredis"; // Import Redis library
import { produceMessage } from "./services/kafka";

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // Create HTTP server
server.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379");
const redisPassword = process.env.REDIS_PASSWORD || "";

// Create Redis clients
const pub = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});

const sub = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });

    pub.publish("MESSAGES", JSON.stringify(newMessageRecieved));
  });
});

// Handle Redis pub/sub
sub.subscribe("MESSAGES");
sub.on("message", async (channel, message) => {
  console.log(message);
  if (channel === "MESSAGES") {
    io.emit("message", { message });
    console.log("new message from redis");
    await produceMessage(message);
    console.log("Message Produced to Kafka Broker");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

export { app, server };
