// /* eslint-disable react/prop-types */

// import { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
// import UserBadgeItem from "../userAvatar/UserBadgeItem";
// import UserListItem from "../userAvatar/UserListItem";
// import {
//     ChatreName,
//     GroupAdd,
//     GroupRemove,
//     SearchUser,
// } from "../../modules/api";
// import Loader from "../../shared/Loader";

// const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
//     const [groupChatName, setGroupChatName] = useState();
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const { selectedChat, setSelectedChat, user } = ChatState();

//     const handleSearch = async (query) => {
//         setSearch(query);
//         if (!query) {
//             return;
//         }

//         try {
//             setLoading(true);

//             const { data } = await SearchUser(search);
//             setLoading(false);
//             setSearchResult(data);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     const handleRename = async () => {
//         if (!groupChatName) return;

//         try {
//             const { data } = await ChatreName({
//                 chatId: selectedChat._id,
//                 chatName: groupChatName,
//             });

//             setSelectedChat(data);
//             setFetchAgain(!fetchAgain);
//         } catch (error) {
//             console.log(error);
//         }
//         setGroupChatName("");
//     };

//     const handleAddUser = async (user1) => {
//         if (selectedChat.users.find((u) => u._id === user1._id)) {
//             return;
//         }

//         if (selectedChat.groupAdmin._id !== user._id) {
//             return;
//         }

//         try {
//             setLoading(true);

//             const { data } = await GroupAdd({
//                 chatId: selectedChat._id,
//                 userId: user1._id,
//             });

//             setSelectedChat(data);
//             setFetchAgain(!fetchAgain);
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//         setGroupChatName("");
//     };

//     const handleRemove = async (user1) => {
//         if (
//             selectedChat.groupAdmin._id !== user._id &&
//             user1._id !== user._id
//         ) {
//             return;
//         }

//         try {
//             setLoading(true);

//             const { data } = await GroupRemove({
//                 chatId: selectedChat._id,
//                 userId: user1._id,
//             });

//             user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
//             setFetchAgain(!fetchAgain);
//             fetchMessages();
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//         setGroupChatName("");
//     };

//     return (
//         <>

//             <Modal onClose={onClose} isOpen={isOpen} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader
//                         fontSize="35px"
//                         fontFamily="Work sans"
//                         d="flex"
//                         justifyContent="center"
//                     >
//                         {selectedChat.chatName}
//                     </ModalHeader>

//                     <ModalCloseButton />
//                     <ModalBody d="flex" flexDir="column" alignItems="center">
//                         <div className=" w-full flex flex-wrap pb-3">
//                             {selectedChat.users.map((u) => (
//                                 <UserBadgeItem
//                                     key={u._id}
//                                     user={u}
//                                     admin={selectedChat.groupAdmin}
//                                     handleFunction={() => handleRemove(u)}
//                                 />
//                             ))}
//                         </div>
//                         <FormControl d="flex">
//                             <input
//                                 className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder="Chat Name"
//                                 value={groupChatName}
//                                 onChange={(e) =>
//                                     setGroupChatName(e.target.value)
//                                 }
//                             />
//                             <button onClick={handleRename}>Update</button>
//                         </FormControl>
//                         <FormControl>
//                             <input
//                                 className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder="Add User to group"
//                                 onChange={(e) => handleSearch(e.target.value)}
//                             />
//                         </FormControl>

//                         {loading ? (
//                             <Loader />
//                         ) : (
//                             searchResult?.map((user) => (
//                                 <UserListItem
//                                     key={user._id}
//                                     user={user}
//                                     handleFunction={() => handleAddUser(user)}
//                                 />
//                             ))
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <button onClick={() => handleRemove(user)}>
//                             Leave Group
//                         </button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };

// export default UpdateGroupChatModal;

const UpdateGroupChatModal = () => {
    return <div>UpdateGroupChatModal</div>;
};

export default UpdateGroupChatModal;
