import "./App.css";

import "../src/common.css";
// import Homepage from "./Pages/Homepage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Home from "./Home";

import withAuthentication from "./shared/components/auth/withAuthentication";
import withoutAuthentication from "./shared/components/auth/withoutAuthentication";
import { Login, Signup } from "./modules/api";

function App() {
    const UnAuthenticated = () => <Outlet />;

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
