import { useContext, useEffect } from "react"
import { getUser } from "../api/User"
import { useState } from "react"
import { UserData } from "../types/UserData"

import { UserContext } from "../providers/UserProvider"
import { useParams } from "react-router-dom"



export default function UserContent() {
    const {userInfo} = useContext(UserContext)
    const [userData, setUserData] = useState<UserData | null>(null)
    const {id} = useParams()
    const user_id = id ? parseInt(id) : null
    
    useEffect(() => {
      (async() => {
        if(!user_id) return;
        const user = await getUser(user_id, userInfo.token)
        setUserData(user)
      })();

    }, [])
    
    
    return (
        <>
            <div>
                {
                    userData ? 
                    <>
                        <div>ユーザーID：{userData.id}</div>
                        <div>ユーザー名：{userData.name}</div>
                        <div>{new Date(userData.created_at)
                            .toLocaleDateString(
                                "ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })
                        .split("/")
                        .join("-")}に始めました。
                        </div>
                    </>
                    : <div>データがありません</div>
                }
            </div>  
        </>
    )
}