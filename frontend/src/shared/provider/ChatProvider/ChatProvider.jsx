/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import useUserInfo from "../../../Context/useUserInfo";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const [user, setUser] = useState();

    const { data: userInfo } = useUserInfo();

    useEffect(() => {
        setUser(userInfo?.data?.data?.currentUser);
    }, [userInfo]);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
