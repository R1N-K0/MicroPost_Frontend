import { useContext, useEffect } from "react"
import { getUser } from "../api/User"
import { useState } from "react"
import { UserData } from "../types/UserData"

import { UserContext } from "../providers/UserProvider"
import { useParams } from "react-router-dom"
import { getUserPosts } from "../api/Post"
import { PostType } from "../providers/PostListProvider"
import Post from "./Post"



export default function UserContent() {
    const {userInfo} = useContext(UserContext)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [userPosts, setUserPosts] = useState<PostType[]>([])
    const {id} = useParams()
    const user_id = id ? parseInt(id) : null
    
    useEffect(() => {
      (async() => {
        if(!user_id) return;
        const user = await getUser(user_id, userInfo.token)
        setUserData(user)
        const posts = await getUserPosts(userInfo.token, user.id)
        if(posts){
                    const postList: PostType[] = posts.map((p: any) => ({
                        id: p.id,
                        user_id: p.user_id,
                        name: p.name,
                        content: p.content,
                        created_at: new Date(p.created_at)
                            
                    }))
                    setUserPosts(postList)
                }
      })();

      console.log(userPosts)

    }, [])
    
    
    return (
        <>
            <div className="container-fluid mx-auto">
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

                        <div className="flex flex-col items-center justify-center space-y-4 lg:w-1/2 md:w-full px-64 mt-3 mb-5 mx-auto">
                            {   
                                userPosts.length > 0 ?
                                
                                userPosts.map((post) => (
                                    <Post post={post} key={post.id}></Post>
                                )) : <div>投稿はありません</div>
                            }
                        </div>
                    </>
                    : <div>データがありません</div>
                }
            </div>  
        </>
    )
}