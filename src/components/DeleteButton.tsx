import { useContext } from "react"
import { deletePost } from "../api/Post"
import { UserContext } from "../providers/UserProvider"
import { usePostList } from "../hooks/usePostList"
import { PostContext } from "../providers/PostListProvider"


type Props = {
    id: number
    onClick: () => Promise<void>
}
export default function DeleteButton(props: Props) {
    const {id, onClick} = props
    const {userInfo} = useContext(UserContext)
    const {getPostList} = usePostList()
  
    
    
    const onPostDelete = async() => {
        await deletePost(userInfo.token, id)
        await getPostList(0)
    }
    
    return (
        <>
            <button className="absolute top-3 right-3 text-sm border border-gray-300 shadow-sm px-1 rounded-sm  hover:text-red-500" onClick={onClick}>削除</button>
        </>
    )
}