import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

// eslint-disable-next-line react/prop-types
const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                // eslint-disable-next-line react/prop-types
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
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
                                    m.sender._id === user._id
                                        ? "#BEE3F8"
                                        : "#B9F5D0"
                                }`,
                                marginLeft: isSameSenderMargin(
                                    messages,
                                    m,
                                    i,
                                    user._id
                                ),
                                marginTop: isSameUser(messages, m, i, user._id)
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
