import { Navigate } from "react-router-dom";
import { getItemFromCookie } from "../../helpers/utils";
import { IDTOKEN } from "../../helpers/constant";

const withoutAuthentication = (WarpedComponent) => {
    const Component = (props) => {
        if (!getItemFromCookie(IDTOKEN)) {
            return <WarpedComponent {...props} />;
        }
        return <Navigate to={"/"} />;
    };
    return <Component />;
};

export default withoutAuthentication;
