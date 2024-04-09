/* eslint-disable react/prop-types */

import { useUser } from "../../Context/userProvider";
import { CircleX } from "lucide-react";

const UserBadgeItem = ({ users, handleFunction, admin }) => {
    const { user } = useUser();

    return (
        <button
            className="px-2 py-1 rounded-lg m-1 mb-2 bg-purple-500 text-white cursor-pointer text-sm flex justify-center items-center gap-2"
            onClick={handleFunction}
            disabled={users?._id === user?.currentUser?._id}
        >
            {users?.name}
            {admin === users?._id && <span> (Admin)</span>}
            {/* <CloseIcon pl={1} /> */}
            {users?._id !== user?.currentUser?._id && <CircleX />}
        </button>
    );
};

export default UserBadgeItem;
