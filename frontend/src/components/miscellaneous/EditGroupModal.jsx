/* eslint-disable react/prop-types */

import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import UserListItem from "../userAvatar/UserListItem";
import { useUser } from "../../Context/userProvider";
import { isEmpty } from "lodash";
import useSearchUser from "../../hooks/useSearchUser";
import useChatRename from "../../hooks/useChatRename";
import useAddUserInGroup from "../../hooks/useAddUserInGroup";
import useRemoveUserInGroup from "../../hooks/useRemoveUserInGroup";
import useDeleteGroup from "../../hooks/useDeleteGroup";

const EditGroupModal = ({
    setOpenModel,
    openModel,
    fetchMessages,
    fetchAgain,
    setFetchAgain,
}) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpenModel(!openModel);
        setOpen(false);
    };

    const [groupChatName, setGroupChatName] = useState();
    const [userId, setUserId] = useState();

    const [searchResult, setSearchResult] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const { selectedChat, setSelectedChat } = ChatState();
    const { user } = useUser();

    const { mutate: SearchUser } = useSearchUser(setSearchResult);

    const handleSearch = async (query) => {
        SearchUser(query);
    };

    const { mutate: ChatRename } = useChatRename(
        setSelectedChat,
        setFetchAgain,
        fetchAgain
    );
    const handleRename = async () => {
        if (!groupChatName) return;

        ChatRename({
            chatId: selectedChat._id,
            chatName: groupChatName,
        });
        setFetchAgain(!fetchAgain);
    };

    const { mutate: addUserInGroup } = useAddUserInGroup(setSelectedChat);
    const handleAddUser = async (user1) => {
        if (selectedUsers.includes(user1)) {
            return;
        }

        setSelectedUsers([...selectedUsers, user1]);

        if (selectedChat?.users.find((u) => u._id === user1._id)) {
            return;
        }

        if (selectedChat?.groupAdmin._id !== user?.currentUser._id) {
            return;
        }

        addUserInGroup({
            chatId: selectedChat._id,
            userId: user1._id,
        });

        setFetchAgain(!fetchAgain);
    };

    const { mutate: removeUserInGroup } = useRemoveUserInGroup(
        setSelectedChat,
        userId
    );
    const handleuserRemove = async (user1) => {
        setUserId(user1._id);

        if (
            selectedChat.groupAdmin._id !== user?.currentUser._id &&
            user1._id !== user?.currentUser._id
        ) {
            return;
        }

        removeUserInGroup({
            chatId: selectedChat._id,
            userId: user1._id,
        });

        setFetchAgain(!fetchAgain);
        fetchMessages();
    };
    const { mutate: deleteGroup } = useDeleteGroup();

    const handleGroupDelete = async () => {
        if (!selectedChat?._id) return;
        deleteGroup(selectedChat?._id);
        handleClose();
        setFetchAgain(!fetchAgain);
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[90]"
                    onClose={() => null}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 maxMd:items-center maxMd:justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"></div>
                                    <div className="flex sm:items-start flex-col maxXs:flex-col maxXs:items-center w-full">
                                        <p className=" text-xl m-auto">
                                            {selectedChat?.chatName}
                                        </p>

                                        <div className="mt-3 text-center   sm:text-left w-full flex justify-start items-center">
                                            {selectedChat?.users?.map((u) => (
                                                <UserBadgeItem
                                                    key={u._id}
                                                    users={u}
                                                    admin={
                                                        selectedChat.groupAdmin
                                                    }
                                                    handleFunction={() =>
                                                        handleuserRemove(u)
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-3 text-center  sm:text-left w-full">
                                            <label>Group Name</label>
                                            <div className="flex justify-between gap-2">
                                                <input
                                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                                    placeholder="Chat Name"
                                                    value={groupChatName}
                                                    onChange={(e) =>
                                                        setGroupChatName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <button
                                                    className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  sm:w-auto "
                                                    onClick={() =>
                                                        handleRename()
                                                    }
                                                >
                                                    Update Group Name
                                                </button>
                                            </div>
                                        </div>
                                        <div className=" w-full">
                                            <label>User Name</label>
                                            <input
                                                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 mb-2"
                                                placeholder="Add Users eg: John, Piyush, Jane"
                                                onChange={(e) =>
                                                    handleSearch(e.target.value)
                                                }
                                            />

                                            {!isEmpty(searchResult) &&
                                                searchResult?.map((user) => (
                                                    <UserListItem
                                                        key={user._id}
                                                        user={user}
                                                        handleFunction={() =>
                                                            handleAddUser(user)
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => handleClose()}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleuserRemove(
                                                    user?.currentUser
                                                )
                                            }
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Leave Group
                                        </button>
                                        {selectedChat?.groupAdmin?._id ===
                                            user?.currentUser?._id && (
                                            <button
                                                onClick={() =>
                                                    handleGroupDelete()
                                                }
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                Delete Group
                                            </button>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    {/* </form> */}
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default EditGroupModal;
