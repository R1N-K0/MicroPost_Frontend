import { Navigate } from "react-router-dom";
import Layout from "../components/MainLayout";
import { PostProvider } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { useContext } from "react";

export default function Main() {
    const {userInfo} = useContext(UserContext);
    const loggedIn = (userInfo.token !== "");
    return (
        <>  
      
            {
                loggedIn ? <Layout></Layout> : <Navigate replace to="/"></Navigate>
            }
        
        </>
    )
}