/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import { getSender } from "../config/ChatLogics";
import { useEffect, useState } from "react";

import ScrollableChat from "./ScrollableChat";

import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";

import { MessageWithUser, MessageWithUserId } from "../modules/api";

import EditGroupChatModal from "./miscellaneous/EditGroupChatModal";

let socket, selectedChatCompare;

// eslint-disable-next-line react/prop-types
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const { data } = await MessageWithUserId(selectedChat._id);
            setMessages(data);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            event.preventDefault();
            socket.emit("stop typing", selectedChat._id);
            try {
                setNewMessage("");

                const { data } = await MessageWithUser({
                    content: newMessage,
                    chatId: selectedChat,
                });
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        socket = io(import.meta.env.VITE_ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [socket]);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        e.stopPropagation();

        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <text className="text-base md:text-lg pb-3 px-2 w-full font-work-sans flex justify-between items-center">
                        <button onClick={() => setSelectedChat("")}>
                            back
                        </button>
                        {messages &&
                            (!selectedChat.isGroupChat ? (
                                <>
                                    {getSender(user, selectedChat?.users)}
                                    {/* <ProfileModal
                                        user={getSenderFull(
                                            user,
                                            selectedChat.users
                                        )}
                                    /> */}
                                </>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <EditGroupChatModal
                                        fetchMessages={fetchMessages}
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>
                            ))}
                    </text>
                    <div className="flex flex-col justify-end p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden">
                        <div className="messages">
                            <ScrollableChat messages={messages} />
                        </div>

                        <form onKeyDown={sendMessage} id="first-name">
                            {istyping ? <div>Typing</div> : <></>}
                            <input
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 mt-2"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={(e) => typingHandler(e)}
                            />
                        </form>
                    </div>
                </>
            ) : (
                // to get socket.io on same page
                <div className=" flex justify-center items-center h-full">
                    <text className=" pb-3">
                        Click on a user to start chatting
                    </text>
                </div>
            )}
        </>
    );
};

export default SingleChat;
