import "./App.css";
import Homepage from "./Pages/Homepage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { getItemFromCookie, setItemInCookie } from "./shared/helpers/utils";
import { ACCESSTOKEN, REFRESHTOKEN } from "./shared/helpers/constant";
import { rereshToken } from "./shared/api";
import { useEffect } from "react";
import withAuthentication from "./shared/components/auth/withAuthentication";
import withoutAuthentication from "./shared/components/auth/withoutAuthentication";

function App() {
    const UnAuthenticated = () => <Outlet />;
    useEffect(() => {
        const fetchData = async () => {
            const refreshToken = getItemFromCookie(REFRESHTOKEN);
            if (refreshToken) {
                try {
                    const data = await rereshToken(refreshToken);

                    setItemInCookie(
                        ACCESSTOKEN,
                        `${data?.data?.data?.accessToken}`
                    );
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            }
        };

        const refreshTokenFromCookie = getItemFromCookie(REFRESHTOKEN);

        if (refreshTokenFromCookie) {
            const delayInMilliseconds = 10 * 60 * 60 * 1000;
            setTimeout(() => {
                fetchData();
            }, delayInMilliseconds);
        }
    }, []);
    return (
        <div className="App">
            {/* <Route path="/" index element={<Homepage />} /> */}

            <Routes>
                <Route path="/*" element={withAuthentication(Chatpage)}>
                    <Route index element={<Navigate to={"/"} />} />
                </Route>
                <Route path="" element={withoutAuthentication(UnAuthenticated)}>
                    {/* <Route path="/chats" element={<Chatpage />} /> */}

                    <Route path="/" index element={<Homepage />} />
                    {/* <Route path="signup" index element={<Signup />} /> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
