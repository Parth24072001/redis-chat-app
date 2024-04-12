"use client";
import { useState } from "react";
import { useSocket } from "./context/SocketProvider";

export default function App() {
    const { sendMessage, messages } = useSocket();
    const [message, setMessage] = useState("");
    return (
        <div>
            <div>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    className={"chat-input"}
                    placeholder="Message..."
                />
                <button
                    onClick={(e) => sendMessage(message)}
                    className={"button"}
                >
                    Send
                </button>
            </div>
            {messages.map((e) => (
                <li>{e}</li>
            ))}
        </div>
    );
}
