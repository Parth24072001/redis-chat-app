/* eslint-disable react/prop-types */

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <div
            className="px-2 py-1 rounded-lg m-1 mb-2 bg-purple-500 text-white cursor-pointer text-sm"
            onClick={handleFunction}
        >
            {user?.name}
            {admin === user?._id && <span> (Admin)</span>}
            {/* <CloseIcon pl={1} /> */}
        </div>
    );
};

export default UserBadgeItem;
