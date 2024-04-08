/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import moment from "moment-timezone";
import { CircleUserRound } from "lucide-react";
import {
    isLastMessage,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";

import { useUser } from "../Context/userProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = useUser();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {messages &&
                messages.map((m, i) => (
                    <div
                        className="flex justify-start items-center gap-2"
                        key={m._id}
                    >
                        {isLastMessage(messages, i, user?.currentUser._id) && (
                            <CircleUserRound size={30} />
                        )}

                        <p
                            style={{
                                backgroundColor: `${
                                    m.sender._id === user?.currentUser._id
                                        ? "#BEE3F8"
                                        : "#B9F5D0"
                                }`,
                                marginLeft: isSameSenderMargin(
                                    messages,
                                    m,
                                    i,
                                    user?.currentUser._id
                                ),
                                marginTop: isSameUser(
                                    messages,
                                    m,
                                    i,
                                    user?.currentUser._id
                                )
                                    ? 3
                                    : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                            className=" text-left"
                        >
                            {m.content}
                            <p className=" text-xs">
                                {moment(messages?.createdAt).format(
                                    "DD MMMM YYYY hh:mm A"
                                )}
                            </p>
                        </p>
                    </div>
                ))}
            <div ref={messagesEndRef} />
        </>
    );
};

export default ScrollableChat;
