/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useUser } from "../../shared/provider/user-provider/userProvider";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// eslint-disable-next-line react/prop-types

const UserProfileModal = ({ setOpenModel }) => {
    const { user } = useUser();

    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpenModel("ProfileModal");
        setOpen(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[90]" onClose={() => null}>
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
                                    <text
                                        fontSize={{
                                            base: "28px",
                                            md: "30px",
                                        }}
                                        fontFamily="Work sans"
                                    >
                                        Email: {user.currentUser.email}
                                    </text>

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
            </Dialog>
        </Transition.Root>
    );
};

export default UserProfileModal;
