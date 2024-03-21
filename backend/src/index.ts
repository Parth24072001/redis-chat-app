import express from "express";
import connectDB from "./config/db"; // Update the path as necessary
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4000",
  },
});

io.on("connection", (socket: any) => {
  console.log("Connected to socket.io");
});

export { app };
