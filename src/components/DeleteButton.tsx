import { useContext } from "react"
import { deletePost } from "../api/Post"
import { UserContext } from "../providers/UserProvider"
import { usePostList } from "../hooks/usePostList"


type Props = {
    id: number
}
export default function DeleteButton(props: Props) {
    const {id} = props
    const {userInfo} = useContext(UserContext)
    const {getPostList} = usePostList()
    
    const onPostDelete = async() => {
        await deletePost(userInfo.token, id)
        await getPostList(0)
    }
    
    return (
        <>
            <button className="text-sm border border-gray-300 shadow-sm px-1 rounded-sm  hover:text-red-500" onClick={onPostDelete}>削除</button>
        </>
    )
}