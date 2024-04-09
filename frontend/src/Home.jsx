import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { UserProvider } from "./shared/provider/user-provider/userProvider";

const Home = () => {
    return (
        <>
            <UserProvider>
                <Routes>
                    <Route path="/" index element={<Chatpage />} />
                </Routes>
            </UserProvider>
        </>
    );
};

export default Home;
