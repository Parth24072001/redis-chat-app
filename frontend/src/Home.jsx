import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

const Home = () => {
    return (
        <>
            <Routes>
                <Route path="/chatpage" index element={<Chatpage />} />
                <Route path="/" index element={<Chatpage />} />
            </Routes>
        </>
    );
};

export default Home;
