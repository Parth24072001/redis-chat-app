/* eslint-disable react/prop-types */

import { ChatState } from "../../shared/provider/ChatProvider/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import UserListItem from "../userAvatar/UserListItem";
import useCreateGroup from "../../hooks/useCreateGroup";
import useSearchUser from "../../hooks/useSearchUser";

const CreateGroupModal = ({ setOpenModel, openModel }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpenModel(!openModel);
        setOpen(false);
    };

    const [groupChatName, setGroupChatName] = useState();
    const [searchResult, setSearchResult] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const { selectedChat, setChats, chats } = ChatState();

    const { mutate: SearchUser } = useSearchUser(setSearchResult);

    const handleSearch = async (query) => {
        SearchUser(query);
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id)
        );
    };

    const { mutate: createGroup } = useCreateGroup(setChats, chats);

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            return;
        }

        createGroup({
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
        });

        setOpenModel(!openModel);
        setOpen(false);
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
                                            {selectedUsers?.map((u) => (
                                                <UserBadgeItem
                                                    key={u._id}
                                                    users={u}
                                                    admin={
                                                        selectedChat?.groupAdmin
                                                    }
                                                    handleFunction={() =>
                                                        handleDelete(u)
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-3 text-center  sm:text-left w-full">
                                            <label>Group Name</label>
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

                                            {searchResult?.map((user) => (
                                                <UserListItem
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction={() =>
                                                        handleGroup(user)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                                        <button
                                            onClick={() => handleSubmit()}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Create Chat
                                        </button>

                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => handleClose()}
                                        >
                                            Cancel
                                        </button>
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

export default CreateGroupModal;
