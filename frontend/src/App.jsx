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

    return (
        <div>
            <Routes>
                <Route path="/*" element={withAuthentication(Home)}>
                    <Route index element={<Navigate to={"/chatpage"} />} />
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
