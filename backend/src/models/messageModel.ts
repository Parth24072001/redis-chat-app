import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  content: string;
  chat: Schema.Types.ObjectId;
  readBy: Schema.Types.ObjectId[];
}

const messageSchema: Schema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
export default Message;
