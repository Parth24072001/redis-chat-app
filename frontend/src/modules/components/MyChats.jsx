/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../../shared/provider/ChatProvider/ChatProvider";

import { isArray } from "lodash";
import { useUser } from "../../shared/provider/user-provider/userProvider";
import CreateGroupChatModal from "./CreateGroupChatModal";
import useGetChats from "../hooks/useGetChats";
import Loader from "../../shared/components/loader/Loader";
import { getSender } from "../../shared/helpers/ChatLogics";

const MyChats = () => {
    const { setSelectedChat, chats, setChats } = ChatState();

    const { user } = useUser();
    const { data: chatData, isLoading } = useGetChats();

    useEffect(() => {
        setChats(chatData);
    }, [chatData]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex md:flex flex-col items-center  bg-white w-full  h-full rounded-lg border-1">
            <div className="pb-3 px-3 text-lg md:text-xl font-work-sans flex justify-between items-center w-full">
                My Chats
                <CreateGroupChatModal />
            </div>
            <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden chatUserList">
                {chats ? (
                    <div className=" overflow-y-scroll">
                        {isArray(chats) &&
                            chats?.map((chat, index) => (
                                <button
                                    onClick={() => setSelectedChat(chat)}
                                    className="cursor-pointer bg-teal-500 text-white  px-3 py-2 rounded-lg mb-1 w-full flex flex-col justify-start items-start"
                                    key={index}
                                >
                                    <p className=" text-lg text-black">
                                        {!chat.isGroupChat
                                            ? getSender(
                                                  user?.currentUser,
                                                  chat.users
                                              )
                                            : chat.chatName}
                                    </p>

                                    {chat.latestMessage && (
                                        <p className=" text-sm max-w-[120px] w-full overflow-hidden text-left">
                                            {chat.latestMessage.content.length >
                                            50
                                                ? chat.latestMessage.content.substring(
                                                      0,
                                                      51
                                                  ) + "..."
                                                : chat.latestMessage.content}
                                        </p>
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
