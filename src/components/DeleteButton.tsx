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
            {/* <button className="absolute top-3 right-3 text-sm border border-gray-300 shadow-sm px-1 rounded-sm  hover:text-red-500" onClick={onClick}>削除</button> */}
            <svg className="absolute top-3 right-3 text-sm w-6 h-5 text-gray-700 hover:text-red-500 hover:cursor-pointer"  onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"/></svg>
        </>
    )
}