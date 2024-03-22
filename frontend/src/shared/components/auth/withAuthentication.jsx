import { Navigate } from "react-router-dom";
import { getItemFromCookie } from "../../helpers/utils";

const withAuthentication = (WarpedComponent) => {
    const Component = (props) => {
        if (getItemFromCookie("accessToken")) {
            return <WarpedComponent {...props} />;
        }
        return <Navigate to="/" />;
    };

    return <Component />;
};

export default withAuthentication;
