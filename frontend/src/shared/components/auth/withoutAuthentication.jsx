import { Navigate } from "react-router-dom";
import { getItemFromCookie } from "../../helpers/utils";

const withoutAuthentication = (WarpedComponent) => {
    const Component = (props) => {
        if (!getItemFromCookie("IdToken")) {
            return <WarpedComponent {...props} />;
        }
        return <Navigate to={"/"} />;
    };
    return <Component />;
};

export default withoutAuthentication;
