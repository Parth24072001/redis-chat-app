import express from "express";
import connectDB from "./config/db"; // Update the path as necessary
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";
import http from "http"; // Import http module for creating the server
import { Server } from "socket.io"; // Import Server class from socket.io

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // Create HTTP server
server.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

export { app, server }; // Exporting server as well for testing purposes
