/* eslint-disable react/prop-types */
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
    const { user } = ChatState();

    return (
        <div
            onClick={handleFunction}
            className="cursor-pointer bg-gray-200 hover:bg-teal-400 text-black hover:text-white w-full flex items-center px-3 py-2 mb-2 rounded-lg"
        >
            <image size="sm" cursor="pointer" name={user.name} src={user.pic} />
            <div>
                <text>{user.name}</text>
                <text>
                    <b>Email : </b>
                    {user.email}
                </text>
            </div>
        </div>
    );
};

export default UserListItem;
