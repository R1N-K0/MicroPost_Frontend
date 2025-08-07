import { useContext } from "react"
import { PostContext } from "../providers/PostListProvider"
import { PageContext } from "../providers/PageProvider"
import { UserContext } from "../providers/UserProvider"
import { getList } from "../api/Post"
import { PostType } from "../providers/PostListProvider"

export const usePostList = () => {
    const {setPostList} = useContext(PostContext)
    const {setIndex} = useContext(PageContext)
    const {userInfo} = useContext(UserContext)
    
    const getPostList = async(start: number = 0) => {
        const posts = await getList(userInfo.token, start)
    
        if(posts){
            const postList: PostType[] = posts.map((p: any) => ({
                id: p.id,
                user_id: p.user_id,
                user_name: p.user_name,
                content: p.content,
                created_at: new Date(p.created_at)
                    
            }))
            if(postList.length > 0){
                setPostList(postList)
                setIndex(start)
            }
           
        }
    
    }

    return {getPostList}
}