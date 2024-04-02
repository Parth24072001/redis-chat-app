/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { removeItemInCookie } from "../../shared/helpers/utils";
import ModalPortal from "../../shared/ModalPortal";

import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/ChatLogics";
import UserProfileModal from "./UserProfileModal";

const Header = () => {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState({
        ProfileModal: false,
        notificationModal: false,
        userMenuModal: false,
    });

    const openModal = (modalName) => {
        setActiveModal((prevState) => ({
            ProfileModal:
                modalName === "ProfileModal" && !prevState.ProfileModal,

            notificationModal:
                modalName === "notificationModal" &&
                !prevState.notificationModal,
            userMenuModal:
                modalName === "userMenuModal" && !prevState.userMenuModal,
        }));
    };

    const { setSelectedChat, user, notification, setNotification } =
        ChatState();

    const logoutHandler = () => {
        removeItemInCookie("accessToken");
        removeItemInCookie("refreshToken");
        navigate("/login");
    };

    return (
        <div className="header">
            <div></div>
            <text fontSize="2xl" fontFamily="Work sans">
                Talk-A-Tive
            </text>
            <div className="  flex justify-between gap-2">
                <div className=" relative">
                    <button
                        className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 "
                        onClick={() => openModal("notificationModal")}
                    >
                        Notification
                    </button>
                    {activeModal?.notificationModal === true && (
                        <ul className=" absolute top-1 right-0 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 !w-[300px]">
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <li
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(
                                            notification.filter(
                                                (n) => n !== notif
                                            )
                                        );
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(
                                              user,
                                              notif.chat.users
                                          )}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className=" relative">
                    <button
                        className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 "
                        onClick={() => openModal("userMenuModal")}
                    >
                        Profile
                    </button>
                    {activeModal?.userMenuModal === true && (
                        <ul className="absolute top-1 right-0 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 !w-[200px] flex flex-col gap-2">
                            <button
                                className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 "
                                onClick={() => openModal("ProfileModal")}
                            >
                                My Profile
                            </button>
                            <button
                                className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 "
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </ul>
                    )}
                </div>
            </div>
            <ModalPortal open={activeModal?.ProfileModal}>
                <UserProfileModal setOpenModel={openModal} />
            </ModalPortal>
        </div>
    );
};

export default Header;
