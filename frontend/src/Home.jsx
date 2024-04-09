import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./shared/provider/user-provider/userProvider";
import Chatpage from "./modules/components/Chatpage";

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
