import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

import { Chat } from "../modules/api";
import { isArray } from "lodash";

// eslint-disable-next-line react/prop-types
const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();

    const { setSelectedChat, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const { data } = await Chat();
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <div className="flex md:flex flex-col items-center p-3 bg-white w-full md:w-1/3 h-full rounded-lg border-1">
            <div className="pb-3 px-3 text-lg md:text-xl font-work-sans flex justify-between items-center w-full">
                My Chats
                <GroupChatModal>
                    <button>New Group Chat</button>
                </GroupChatModal>
            </div>
            <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden">
                {chats ? (
                    <div className=" overflow-y-scroll">
                        {isArray(chats) &&
                            chats?.map((chat) => (
                                <div
                                    onClick={() => setSelectedChat(chat)}
                                    className="cursor-pointer bg-teal-500 text-white  px-3 py-2 rounded-lg"
                                    key={chat}
                                >
                                    <text>
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </text>
                                    {chat.latestMessage && (
                                        <text>
                                            <b>
                                                {chat.latestMessage.sender.name}{" "}
                                                :{" "}
                                            </b>
                                            {chat.latestMessage.content.length >
                                            50
                                                ? chat.latestMessage.content.substring(
                                                      0,
                                                      51
                                                  ) + "..."
                                                : chat.latestMessage.content}
                                        </text>
                                    )}
                                </div>
                            ))}
                    </div>
                ) : (
                    <ChatLoading />
                )}
            </div>
        </div>
    );
};

export default MyChats;
