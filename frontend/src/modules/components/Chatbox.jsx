import SingleChat from "../../components/SingleChat";
import "../../assets/css/styles.css";

// eslint-disable-next-line react/prop-types
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    return (
        <div className="flex md:flex items-center flex-col  bg-white w-full md:w-68 rounded-lg border-1">
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};

export default Chatbox;
