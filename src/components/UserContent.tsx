import { useContext, useEffect } from "react"
import { getUser, updateUser } from "../api/User"
import { useState } from "react"
import { UserData } from "../types/UserData"
import { UserContext } from "../providers/UserProvider"
import { useParams } from "react-router-dom"
import { getUserPosts } from "../api/Post"
import { PostType } from "../providers/PostListProvider"
import Post from "./Post"
import { useImage } from "../hooks/useImage"
import  ImageUpload  from "./ImageUpload";



export default function UserContent() {
    const {image, uploadedImage,  handleChooseImage, handleUploadImage,preview, setPreview } = useImage()
    const {userInfo} = useContext(UserContext)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [userPosts, setUserPosts] = useState<PostType[]>([])
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [text,setText] = useState<string>("")
    const {id} = useParams()
    const user_id = id ? parseInt(id) : null

    const onClickEdit = () => {
        setIsEdit(true)      
        if(!userData) return;
        setText(userData.name)
    }

    const onClickBack = () => {
        setIsEdit(false)
        setText("")
        if(userData?.image) {
            setPreview(userData.image)
        }
        else {
            setPreview("/no-data.jpg")
        }
    }

    const onClickSubmit = async () => {
        await handleUploadImage()
        const data = {
            name: text
        }
        const res = await updateUser(userInfo.token, userData!.id, data)
        setIsEdit(false)
        setText("")
        if(!res) return
        setUserData({...res, image: uploadedImage})
    }
    
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
    }, [])
   useEffect(() => {
    if (userData) {
        setPreview(userData.image || "/no-data.jpg");
    }
    }, [userData]); 
    
    
    return (
        <>
            <div className="container mx-auto mt-12 flex flex-col space-y-1 max-w-2xl h-full mb-5">
                {
                    userData ? 
                    <>
                          
                        <div className="bg-white shadow-md rounded-lg p-6 relative">
                            {userInfo.id === userData.id && !isEdit && (
                            <svg 
                                onClick={onClickEdit}
                                className="w-5 h-5 absolute top-4 right-4 hover:cursor-pointer text-gray-500 hover:text-gray-800"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 384 384" 
                                fill="currentColor"
                            >
                                <path d="M0 304L236 68l80 80L80 384H0v-80zM378 86l-39 39l-80-80l39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15z"/>
                            </svg>
                            )}

                            <div className="flex flex-col items-center justify-center space-y-2">
                                
                                <div className="block w-24 h-24">
                                    <>
                                    <img className="rounded-full w-24 h-24" src={preview} alt="user icon"></img>
                                    </>                                

                                </div>
                                {isEdit ?<>
                                <input type="file" onChange={handleChooseImage}  />
                                <input className="mt-4 w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder={userData.name} value={text} onChange={(e) => setText(e.target.value)} /> </>
                                :<div className="font-bold text-2xl text-gray-800">{userData.name}</div> }

                                <div className="text-gray-500 text-sm">@{userData.id}</div>
                                <div className="text-gray-400 text-sm">
                                    {new Date(userData.created_at).toLocaleDateString("ja-JP", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    }).split("/").join("-")} に始めました
                                </div>
                            </div>

                            {isEdit && (
                                <div className="flex justify-center items-center space-x-3 mt-2">
                                    <button className="px-4 py-1 bg-gray-200 font-medium text-sm rounded hover:bg-gray-300" onClick={onClickBack}>戻る</button>
                                    <button className="px-4 py-1 bg-blue-500 text-white font-medium text-sm rounded hover:bg-blue-600" onClick={onClickSubmit}>保存</button>
                                </div>
                            )}

                        </div>

       
                        
                        <div className="flex flex-col items-start justify-start mx-auto mb-5 space-y-2">
                                <div className="flex flex-row items-center justify-between w-full mt-4 mb-5">
                                    <div className="text-gray-700 font-bold ">投稿一覧</div>
                                    <div>投稿数：{userPosts.length}</div>    
                                </div>
                                <div className="flex flex-col items-center justify-center space-y-4 ">
                                    {   
                                        userPosts.length > 0 ?
                                        
                                        userPosts.map((post) => (
                                            <Post post={post} key={post.id}></Post>
                                        )) : <div>投稿はありません</div>
                                    }
                                </div>
                        </div>
                    </>
                    : <div>データがありません</div>
                }
            </div>  
        </>
    )
}