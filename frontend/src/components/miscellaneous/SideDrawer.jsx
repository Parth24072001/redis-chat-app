// import { useDisclosure } from "@chakra-ui/hooks";

// // import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import ChatLoading from "../ChatLoading";
// import ProfileModal from "./ProfileModal";
// import { getSender } from "../../config/ChatLogics";
// import UserListItem from "../userAvatar/UserListItem";
// import { ChatState } from "../../Context/ChatProvider";
// import { ChatWithId, SearchUser } from "../../modules/api";
// import { removeItemInCookie } from "../../shared/helpers/utils";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../shared/Loader";
// import ModalPortal from "../../shared/ModalPortal";

// function SideDrawer() {
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [profileModal, setProfileModal] = useState(false);

//     const [loadingChat, setLoadingChat] = useState(false);

//     const navigate = useNavigate();

//     const {
//         setSelectedChat,
//         user,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//     } = ChatState();

//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const logoutHandler = () => {
//         removeItemInCookie("accessToken");
//         removeItemInCookie("refreshToken");
//         navigate("/login");
//     };

//     const handleSearch = async () => {
//         if (!search) {
//             return;
//         }

//         try {
//             setLoading(true);

//             const { data } = await SearchUser(search);
//             setLoading(false);
//             setSearchResult(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const accessChat = async (userId) => {
//         try {
//             setLoadingChat(true);

//             const { data } = await ChatWithId({ userId });

//             if (!chats?.find((c) => c._id === data._id))
//                 setChats([data, ...chats]);
//             setSelectedChat(data);
//             setLoadingChat(false);
//             onClose();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <div className="flex justify-between items-center bg-white w-full p-2 border-2 border-gray-200">
//                 <button onClick={onOpen}>
//                     <i className="fas fa-search"></i>
//                     <text className=" px-4" d={{ base: "none", md: "flex" }}>
//                         Search User
//                     </text>
//                 </button>

//                 <text fontSize="2xl" fontFamily="Work sans">
//                     Talk-A-Tive
//                 </text>
//                 <div>
//                     <div>
//                         <button fontSize="2xl"> notification</button>
//                         <ul>
//                             {!notification.length && "No New Messages"}
//                             {notification.map((notif) => (
//                                 <li
//                                     key={notif._id}
//                                     onClick={() => {
//                                         setSelectedChat(notif.chat);
//                                         setNotification(
//                                             notification.filter(
//                                                 (n) => n !== notif
//                                             )
//                                         );
//                                     }}
//                                 >
//                                     {notif.chat.isGroupChat
//                                         ? `New Message in ${notif.chat.chatName}`
//                                         : `New Message from ${getSender(
//                                               user,
//                                               notif.chat.users
//                                           )}`}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <button>userInfo</button>
//                         <ul>
//                             {/* <ProfileModal user={user}> */}
//                             <li onClick={() => setProfileModal(true)}>
//                                 My Profile
//                             </li>
//                             {/* </ProfileModal> */}
//                             <li onClick={logoutHandler}>Logout</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//                 <DrawerOverlay />
//                 <DrawerContent>
//                     <DrawerHeader borderBottomWidth="1px">
//                         Search Users
//                     </DrawerHeader>
//                     <DrawerBody>
//                         <div className=" flex pb-2">
//                             <input
//                                 className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder="Search by name or email"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                             />
//                             <button onClick={handleSearch}>Go</button>
//                         </div>
//                         {loading ? (
//                             <ChatLoading />
//                         ) : (
//                             searchResult?.map((user) => (
//                                 <UserListItem
//                                     key={user._id}
//                                     user={user}
//                                     handleFunction={() => accessChat(user._id)}
//                                 />
//                             ))
//                         )}
//                         {loadingChat && <Loader />}
//                     </DrawerBody>
//                 </DrawerContent>
//             </Drawer>

//             <ModalPortal open={profileModal}>
//                 <ProfileModal
//                     setOpenModel={setProfileModal}
//                     openModel={profileModal}
//                 />
//             </ModalPortal>
//         </>
//     );
// }

// export default SideDrawer;

function SideDrawer() {
    return <div>SideDrawer</div>;
}

export default SideDrawer;
