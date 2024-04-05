/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../Context/ChatProvider";

import { Chat } from "../modules/api";
import { isArray } from "lodash";
import { useUser } from "../Context/userProvider";
import CreateGroupChatModal from "./miscellaneous/CreateGroupChatModal";

const MyChats = ({ fetchAgain }) => {
    const { user } = useUser();

    const { setSelectedChat, chats, setChats } = ChatState();

    const fetchChats = async () => {
        try {
            const { data } = await Chat();
            setChats(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [fetchAgain]);

    return (
        <div className="flex md:flex flex-col items-center  bg-white w-full  h-full rounded-lg border-1">
            <div className="pb-3 px-3 text-lg md:text-xl font-work-sans flex justify-between items-center w-full">
                My Chats
                <CreateGroupChatModal />
            </div>
            <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden">
                {chats ? (
                    <div className=" overflow-y-scroll">
                        {isArray(chats) &&
                            chats?.map((chat, index) => (
                                <button
                                    onClick={() => setSelectedChat(chat)}
                                    className="cursor-pointer bg-teal-500 text-white  px-3 py-2 rounded-lg mb-1 w-full"
                                    key={index}
                                >
                                    <span className=" text-lg text-black">
                                        {!chat.isGroupChat
                                            ? getSender(
                                                  user?.currentUser,
                                                  chat.users
                                              )
                                            : chat.chatName}
                                    </span>{" "}
                                    :{" "}
                                    {chat.latestMessage && (
                                        <span>
                                            {chat.latestMessage.content.length >
                                            50
                                                ? chat.latestMessage.content.substring(
                                                      0,
                                                      51
                                                  ) + "..."
                                                : chat.latestMessage.content}
                                        </span>
                                    )}
                                </button>
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
