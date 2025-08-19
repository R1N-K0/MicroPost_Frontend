import {useState, useContext, useEffect} from "react";
import { UserContext } from "../providers/UserProvider";
import {post, getList} from "../api/Post"
import { PostContext } from "../providers/PostListProvider";
import { PostType } from "../providers/PostListProvider";
import styled from "styled-components";
import { usePostList } from "../hooks/usePostList";
import { getUser } from "../api/User";
import { Link } from "react-router-dom";


type UserModel = {
  id: number
  name: string,
  email: string
  profile?: {
    description: string,
    img: string
  }
}

export default function SideBar() {
    const [msg, setMsg] = useState<string>("");
    const {userInfo} = useContext(UserContext)
    const {getPostList} = usePostList();
    const [User, setUser] = useState<UserModel | null>(null) 

    useEffect(() => {
    (
      async () => {
      const userData = await getUser(userInfo.id, userInfo.token)
      setUser(userData)
    })(); 
    }, [])

    const onSendClick = async() => {
        await post(userInfo.token, msg);
        await getPostList();
        setMsg("");
    }
    
    return (
        <div className="w-full h-full flex flex-col justify-between p-5 pb-6">          
              <div className="container-fluid text-start space-y-3">
                <img className="rounded-full w-24 h-24 " src={User?.profile?.img ? User.profile.img : "/no-data.jpg"} alt="user icon"></img>
               <div className="ps-1">
                  <div className="font-bold text-3xl p-0 mb-0">{User?.name}</div>
                  <div className="font-semibold  -mt-2  text-gray-600">ID:
                    @{User?.id}</div>
               </div>
               <div className="ps-1">
                  <div className="font-semibold text-gray-700 -mt-1">{User?.email}</div>
               </div>
               <div>
                <Link to={`/main/${userInfo.id}`}><button className="bg-white border border-gray-300 rounded-md shadow-md w-full font-semibold text-gray-700 py-1 hover:bg-gray-100 transition-colors duration-300">プロフィールを見る</button></Link>
               </div>
              </div>
              <div>
                <div>
                  <div className="text-lg text-start font-semibold text-gray-500 mb-2">つぶやく</div>
                  <textarea className="mt-2 mb-1 py-3 font-normal shadow-md text-gray-700 rounded-lg w-full px-4 border border-gray-300  focus:outline-none focus:ring focus:ring-gray-300" rows={3}  value= {msg} onChange={(e) => {setMsg(e.target.value)}}></textarea>
                </div>
                <div>
                    <button className="w-full bg-gray-700 text-white rounded-lg py-2 hover:bg-gray-950" onClick={onSendClick}>投稿する</button>
                </div>
              </div>
        </div>
    )
}



