import { useContext, useEffect, useRef, useState } from "react";
import Post from "./Post";
import { PostContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import styled from "styled-components";
import Paging from "./Paging"
import { PageContext } from "../providers/PageProvider";
import ReloadButton from "./ReloadButton";
import { usePostList } from "../hooks/usePostList";
import SearchBox from "./SearchBox";

export default function PostList() {
    const {postList, keyword,setPostList} = useContext(PostContext);
    const {userInfo} = useContext(UserContext)
    const {setIndex} = useContext(PageContext)
    const latestPostId = 0
    const postIdRef = useRef(latestPostId)

    const {getPostList} = usePostList()

    useEffect(() => {
        (async () => {
            await getPostList(0)
            const interval = setInterval(async() => {
                const posts = await getList(userInfo.token, 0, keyword)
                if(posts){
                    const postList: PostType[] = posts.map((p: any) => ({
                        id: p.id,
                        user_id: p.user_id,
                        user_name: p.user_name,
                        content: p.content,
                        created_at: new Date(p.created_at)
                            
                    }))
                    if(postList.length > 0 && postIdRef.current < postList[0].id){
                        setPostList(postList)
                        setIndex(0)
                        postIdRef.current = postList[0].id

                    }
                }
            }, 60000);
            return () => clearInterval(interval)
        })();
    }, [])

    return (
        <SPostList>
            <div>
                <p>PostList</p>
                <SearchBox></SearchBox>
            </div>
            {postList.length == 0 ? <SNotFoundDiv>投稿がありません</SNotFoundDiv> : 
            (postList.map((post: PostType) => (
                <Post key={post.id} post ={post}></Post>

            )))
            }
            <Paging></Paging>
            <ReloadButton ></ReloadButton>
        </SPostList>
    )
}

const SPostList = styled.div`
    margin-top: 16px;
    height: 100%;
    overflow-y: scroll;
`

const SNotFoundDiv = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`