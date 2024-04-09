/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { ChatState } from "../../shared/provider/ChatProvider/ChatProvider";

import MyChats from "./MyChats";
import { isEmpty } from "lodash";
import useSearchUser from "../hooks/useSearchUser";
import useChatWithId from "../hooks/useChatWithId";
import Loader from "../../shared/components/loader/Loader";

function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const { setSelectedChat, chats, setChats } = ChatState();

    const { mutate: SearchUser, isLoading: loading } =
        useSearchUser(setSearchResult);

    const handleSearch = async () => {
        search.length > 0 && SearchUser(search);
    };
    const { mutate: ChatWithId, isLoading: loadingChat } = useChatWithId(
        setChats,
        chats,
        setSelectedChat
    );
    const accessChat = async (userId) => {
        ChatWithId({ userId });
    };

    return (
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
                <button
                    onClick={() => setSearchResult([])}
                    className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                    Clear
                </button>
            </div>
            {loading ? (
                <ChatLoading />
            ) : (
                !isEmpty(searchResult) &&
                searchResult?.map((user) => (
                    <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                    />
                ))
            )}

            {loadingChat && <Loader />}
            <MyChats />
        </div>
    );
}

export default SideDrawer;
