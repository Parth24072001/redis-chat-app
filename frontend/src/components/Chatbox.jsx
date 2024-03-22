import "./styles.css";
import SingleChat from "./SingleChat";
// import { ChatState } from "../Context/ChatProvider";

// eslint-disable-next-line react/prop-types
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    // const { selectedChat } = ChatState();

    return (
        <div className="flex md:flex items-center flex-col p-3 bg-white w-full md:w-68 rounded-lg border-1">
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};

export default Chatbox;
