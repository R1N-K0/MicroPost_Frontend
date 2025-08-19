import { ReactNode, useContext } from "react"
import { PostType } from "../providers/PostListProvider"
import React from "react"
import styled from "styled-components"
import { UserContext } from "../providers/UserProvider"
import DeleteButton from "./DeleteButton"
import { Link } from "react-router-dom"

type Props = {
    post: PostType
}
export default function Post(props: Props) {
    const {post} = props
    const {userInfo} = useContext(UserContext)
    console.log(post);

    const getDateStr = (dateObj: Date) => {
        const year = post.created_at.getFullYear();
        const month = post.created_at.getMonth() + 1;
        const date = post.created_at.getDate();
        const hour = post.created_at.getHours();
        const min = post.created_at.getMinutes();
        const sec = post.created_at.getSeconds();
        return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
    };

    const getLines = (src: string): ReactNode => {
        return src.split("\n").map((line, index) => {
            return (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            )
        })
    }
    return (

        <div className="block  w-full min-w-96 p-3 text-left px-5 border border-gray-200 rounded-lg shadow-sm relative">
            <div className="flex flex-row space-x-3 items-start justify-start w-full">
                <div><Link to={`/main/${post.user_id}`}><img className="rounded-full w-10 h-10" src={post.img ? post.img :"/no-data.jpg"} alt="user icon"></img></Link></div>
                <div>
                    <div className="flex items-center justify-between space-x-3 w-full">
                        <div className="flex items-center">
                            <div className="text-sm font-bold text-gray-900">
                                <Link to={`/main/${post.user_id}`}>{post.name ? post.name : "ユーザー名"}</Link>
                            </div>
                        </div>
                       <div className="flex items-center justify-center space-x-1">
                            <div className="text-gray-400 text-sm font-normal">{getDateStr(post.created_at)}</div>
                       </div>
                    </div>
                    <p className="font-normal text-gray-700 ">
                        {getLines(post.content)} 
                    </p>
                </div>
            </div>
              {
                userInfo.id === post.user_id ? <DeleteButton id = {post.id}></DeleteButton> : null
                }
        </div>
    )
}

