import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./Context/userProvider";
import Chatpage from "./Pages/Chatpage";

const Home = () => {
    return (
        <>
            <UserProvider>
                <Routes>
                    <Route path="/chatpage" index element={<Chatpage />} />
                    {/* <Route path="/" index element={<Chatpage />} /> */}
                </Routes>
            </UserProvider>
        </>
    );
};

export default Home;
