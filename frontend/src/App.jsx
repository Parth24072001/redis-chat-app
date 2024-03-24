import "./App.css";
// import Homepage from "./Pages/Homepage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { getItemFromCookie, setItemInCookie } from "./shared/helpers/utils";
import { ACCESSTOKEN, REFRESHTOKEN } from "./shared/helpers/constant";
import { rereshToken } from "./shared/api";
import { useEffect } from "react";
import withAuthentication from "./shared/components/auth/withAuthentication";
import withoutAuthentication from "./shared/components/auth/withoutAuthentication";
import Home from "./Home";
import Login from "../src/modules/components/Login";
import Signup from "../src/modules/components/Signup";

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
        <div className="App">
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
