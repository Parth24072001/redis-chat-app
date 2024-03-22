import { Navigate } from "react-router-dom";
import { getItemFromCookie } from "../../helpers/utils";
import { ACCESSTOKEN } from "../../helpers/constant";

const withAuthentication = (WarpedComponent) => {
    const Component = (props) => {
        if (getItemFromCookie(ACCESSTOKEN)) {
            return <WarpedComponent {...props} />;
        }
        return <Navigate to="login" />;
    };

    return <Component />;
};

export default withAuthentication;
