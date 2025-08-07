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
            <button onClick={onPostDelete}>削除</button>
        </>
    )
}