// /* eslint-disable react/prop-types */

// import { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
// import UserBadgeItem from "../userAvatar/UserBadgeItem";
// import UserListItem from "../userAvatar/UserListItem";
// import { GroupChat, SearchUser } from "../../modules/api";

// const GroupChatModal = ({ children }) => {
//     const [groupChatName, setGroupChatName] = useState();
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const { chats, setChats } = ChatState();

//     const handleGroup = (userToAdd) => {
//         if (selectedUsers.includes(userToAdd)) {
//             return;
//         }

//         setSelectedUsers([...selectedUsers, userToAdd]);
//     };

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
//             console.log(error);
//         }
//     };

//     const handleDelete = (delUser) => {
//         setSelectedUsers(
//             selectedUsers.filter((sel) => sel._id !== delUser._id)
//         );
//     };

//     const handleSubmit = async () => {
//         try {
//             const { data } = await GroupChat({
//                 name: groupChatName,
//                 users: JSON.stringify(selectedUsers.map((u) => u._id)),
//             });
//             setChats([data, ...chats]);
//             onClose();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <span onClick={onOpen}>{children}</span>

//             <Modal onClose={onClose} isOpen={isOpen} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader
//                         fontSize="35px"
//                         fontFamily="Work sans"
//                         d="flex"
//                         justifyContent="center"
//                     >
//                         Create Group Chat
//                     </ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody d="flex" flexDir="column" alignItems="center">
//                         <FormControl>
//                             <input
//                                 className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder="Chat Name"
//                                 onChange={(e) =>
//                                     setGroupChatName(e.target.value)
//                                 }
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <input
//                                 className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder="Add Users eg: John, Piyush, Jane"
//                                 onChange={(e) => handleSearch(e.target.value)}
//                             />
//                         </FormControl>
//                         <div className=" w-full flex flex-wrap">
//                             {selectedUsers.map((u) => (
//                                 <UserBadgeItem
//                                     key={u._id}
//                                     user={u}
//                                     handleFunction={() => handleDelete(u)}
//                                 />
//                             ))}
//                         </div>
//                         {loading ? (
//                             // <ChatLoading />
//                             <div>Loading...</div>
//                         ) : (
//                             searchResult
//                                 ?.slice(0, 4)
//                                 .map((user) => (
//                                     <UserListItem
//                                         key={user._id}
//                                         user={user}
//                                         handleFunction={() => handleGroup(user)}
//                                     />
//                                 ))
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <button onClick={handleSubmit}>Create Chat</button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };

// export default GroupChatModal;

function GroupChatModal() {
    return <div>GroupChatModal</div>;
}

export default GroupChatModal;
