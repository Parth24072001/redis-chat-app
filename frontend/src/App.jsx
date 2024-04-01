import "./App.css";

import "../src/common.css";
// import Homepage from "./Pages/Homepage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import withAuthentication from "./shared/components/auth/withAuthentication";
import withoutAuthentication from "./shared/components/auth/withoutAuthentication";
import Home from "./Home";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

function App() {
    const UnAuthenticated = () => <Outlet />;
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const refreshToken = getItemFromCookie(REFRESHTOKEN);
    //         if (refreshToken) {
    //             try {
    //                 const data = await rereshToken(refreshToken);

    //                 setItemInCookie(
    //                     ACCESSTOKEN,
    //                     `${data?.data?.data?.accessToken}`
    //                 );
    //             } catch (error) {
    //                 console.error("Error refreshing token:", error);
    //             }
    //         }
    //     };

    //     const refreshTokenFromCookie = getItemFromCookie(REFRESHTOKEN);

    //     if (refreshTokenFromCookie) {
    //         const delayInMilliseconds = 10 * 60 * 60 * 1000;
    //         setTimeout(() => {
    //             fetchData();
    //         }, delayInMilliseconds);
    //     }
    // }, []);
    return (
        <div>
            <Routes>
                <Route path="/*" element={withAuthentication(Home)}>
                    <Route index element={<Navigate to={"/"} />} />
                </Route>
                <Route path="" element={withoutAuthentication(UnAuthenticated)}>
                    <Route path="login" index element={<Login />} />
                    <Route path="/signup" index element={<Signup />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
