/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { ChatWithId, SearchUser } from "../../modules/api";

import Loader from "../../shared/Loader";
import MyChats from "../MyChats";

function SideDrawer({ fetchAgain }) {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,

        chats,
        setChats,
    } = ChatState();

    const handleSearch = async () => {
        if (!search) {
            return;
        }

        try {
            const { data } = await SearchUser(search);
            setSearchResult(data);
        } catch (error) {
            console.log(error);
        }
    };

    const accessChat = async (userId) => {
        try {
            const { data } = await ChatWithId({ userId });

            if (!chats?.find((c) => c._id === data._id))
                setChats([data, ...chats]);
            setSelectedChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="sidebarContent">
                <div className=" flex pb-2 gap-2">
                    <input
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                        Go
                    </button>
                </div>
                {loading ? (
                    <ChatLoading />
                ) : (
                    searchResult?.map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => accessChat(user._id)}
                        />
                    ))
                )}
                {loadingChat && <Loader />}
                <MyChats fetchAgain={fetchAgain} />
            </div>
        </>
    );
}

export default SideDrawer;
