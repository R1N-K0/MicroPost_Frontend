import { useContext } from "react";
import UserPageLayout from "../components/UserPageLayout";
import { UserContext } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";


export default function UserPage() {
    const {userInfo} = useContext(UserContext);
    const loggedIn = (userInfo.token !== "");
    return (
        <>
            {
                loggedIn ? <UserPageLayout></UserPageLayout>: <Navigate replace to="/"></Navigate>
            }
            
        </>
    )
}