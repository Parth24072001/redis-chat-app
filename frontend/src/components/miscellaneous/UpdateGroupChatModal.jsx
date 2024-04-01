/* eslint-disable react/prop-types */

import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const UpdateGroupChatModal = ({ setOpenModel, openModel }) => {
    const [groupChatName, setGroupChatName] = useState();

    const [open, setOpen] = useState(true);

    const { selectedChat } = ChatState();

    const handleClose = () => {
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

                                        <div className="mt-3 text-center   sm:text-left w-full">
                                            {selectedChat?.users.map((u) => (
                                                <UserBadgeItem
                                                    key={u._id}
                                                    user={u}
                                                    admin={
                                                        selectedChat.groupAdmin
                                                    }
                                                    // handleFunction={() =>
                                                    //     handleRemove(u)
                                                    // }
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-3 text-center  sm:text-left w-full">
                                            <label>Expense Type</label>
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
                                            {/* {loading ? (
                                                <Loader />
                                            ) : (
                                                searchResult?.map((user) => (
                                                    <UserListItem
                                                        key={user._id}
                                                        user={user}
                                                        handleFunction={() =>
                                                            handleAddUser(user)
                                                        }
                                                    />
                                                ))
                                            )} */}
                                            <button>Update</button>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                                        <button>Update</button>

                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => handleClose()}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                        // onClick={() => handleRemove(user)}
                                        >
                                            Leave Group
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

export default UpdateGroupChatModal;
