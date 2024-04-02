import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";

import { useUser } from "../Context/userProvider";

// eslint-disable-next-line react/prop-types
const ScrollableChat = ({ messages }) => {
    const { user } = useUser();
    return (
        <ScrollableFeed>
            {messages &&
                // eslint-disable-next-line react/prop-types
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user?.currentUser._id) ||
                            isLastMessage(
                                messages,
                                i,
                                user?.currentUser._id
                            )) && (
                            <image
                                className=" mt-[7px] mr-[1px]"
                                size="sm"
                                cursor="pointer"
                                name={m.sender.name}
                                src={m.sender.pic}
                            />
                        )}
                        <span
                            style={{
                                backgroundColor: `${
                                    m.sender._id === user?.currentUser._id
                                        ? "#BEE3F8"
                                        : "#B9F5D0"
                                }`,
                                marginLeft: isSameSenderMargin(
                                    messages,
                                    m,
                                    i,
                                    user?.currentUser._id
                                ),
                                marginTop: isSameUser(
                                    messages,
                                    m,
                                    i,
                                    user?.currentUser._id
                                )
                                    ? 3
                                    : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
