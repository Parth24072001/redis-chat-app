/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { me } from "../../../apiInetrcepter";
import { getItemFromCookie } from "../../helpers/utils";

export const UserContext = createContext(null);
export const PublicUserContext = createContext(null);

export const UserProvider = ({ children, isPublic }) => {
    const {
        data: response,
        isLoading,
        refetch,
    } = useQuery(["getUser"], me, {
        enabled: isPublic ? !!getItemFromCookie("Token") : true,
    });
    const value = { user: response?.data.data, isLoading, refetch };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
