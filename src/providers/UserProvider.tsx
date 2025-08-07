import { useState, createContext, Dispatch, SetStateAction } from "react";
import {ReactNode}  from "react";
import React from "react";

type UserInfo = {
    id: number,
    token: string,
}

type Props = {
    children: ReactNode | ReactNode[]
}

export const UserContext = createContext({} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    
})

export const UserProvider = (props: Props) => {
    const {children} = props;

    const [userInfo, setUserInfo] = useState<UserInfo> (
        {
            id: 0, token: ""
        }
    )
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
    )
}