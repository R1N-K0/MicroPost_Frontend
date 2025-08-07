import {useState, useContext} from "react";
import { UserContext } from "../providers/UserProvider";
import {post, getList} from "../api/Post"
import { PostContext } from "../providers/PostListProvider";
import { PostType } from "../providers/PostListProvider";
import styled from "styled-components";

export default function SideBar() {
    const [msg, setMsg] = useState<string>("");
    const {userInfo} = useContext(UserContext);
    const {setPostList} = useContext(PostContext);

    const getPostList = async() => {
            const posts = await getList(userInfo.token);
    
            if(posts){
                const postList: PostType[] = posts.map((p: any) => ({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at)
                    
                }))
                setPostList(postList)
            }
        
        }
    

    const onSendClick = async() => {
        await post(userInfo.token, msg);
        await getPostList();
    }
    
    return (
        <SSideBar>
            <SSideBarRow>hoge</SSideBarRow>
            <SSideBarRow>hoge@example.com</SSideBarRow>
            <SSideBarRow>
                <SSideBarTextArea rows={4} value={msg} onChange={(e) => {setMsg(e.target.value)}}></SSideBarTextArea>
            </SSideBarRow>
            <SSideBarRow>
                <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
            </SSideBarRow>
        </SSideBar>
    )
}


const SSideBar = styled.div`
  padding: 8px;
`

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`