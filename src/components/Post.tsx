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
        <SPost>
           <div>
                <SName><Link to={`/main/${post.user_id}`}>リンク</Link></SName>
                <SDate>{getDateStr(post.created_at)}</SDate>
                <div>
                    {getLines(post.content)}
                    {
                        userInfo.id === post.user_id ? <DeleteButton id = {post.id}></DeleteButton> : null
                    }
                    </div>
           </div>
        </SPost>
    )
}


const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`

const SName = styled.span`
  font-size: small;
  color: #000044;
`

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;

`