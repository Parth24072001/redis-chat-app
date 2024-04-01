/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useUser } from "../../Context/userProvider";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// eslint-disable-next-line react/prop-types

const ProfileModal = ({ setOpenModel, openModel }) => {
    const { user } = useUser();

    const [open, setOpen] = useState(true);
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

                    <image
                        className=" rounded-full w-[150px]"
                        src={user.pic}
                        alt={user.name}
                    />
                    <text
                        fontSize={{ base: "28px", md: "30px" }}
                        fontFamily="Work sans"
                    >
                        Email: {user.email}
                    </text>

                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blackolive shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </button>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProfileModal;
