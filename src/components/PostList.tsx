import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import styled from "styled-components";
import Paging from "./Paging"

export default function PostList() {
    const {postList, setPostList} = useContext(PostContext);
    const { userInfo} = useContext(UserContext);
    const [index, setIndex] = useState<number>(0)

    const getPostList = async(start: number = 0) => {
        const posts = await getList(userInfo.token);

        if(posts){
            const postList: PostType[] = posts.map((p: any) => ({
                id: p.id,
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


    useEffect(() => {
        getPostList(0)

        const interval = setInterval(() => {
            getPostList(0)
        }, 60000);

        return () => clearInterval(interval)
    }, [])
    
    return (
        <SPostList>
            <p>PostList</p>
            {postList.map((post: PostType) => (
                <Post key={post.id} post ={post}></Post>
            ))}
            <Paging index = {index} setIndex = {setIndex}></Paging>
        </SPostList>
    )
}

const SPostList = styled.div`
    margin-top: 16px;
    height: 100%;
    overflow-y: scroll;
`