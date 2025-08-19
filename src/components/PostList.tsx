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
import { deletePost } from "../api/Post";

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
                        name: p.name,
                        content: p.content,
                        img: p.img,
                        description: p.description,
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

    const onPostDelete = async(id: number) => {
            await deletePost(userInfo.token, id)
            await getPostList(0)
    }

    return (
        <div className="overflow-y-scroll h-full py-5 ">
            <div>
                <p className="text-2xl font-bold text-slate-800">PostList</p>
                <SearchBox></SearchBox>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-4 w-full px-64 mt-3 mb-5">
                {postList.length == 0 ? <SNotFoundDiv>投稿がありません</SNotFoundDiv> : 
                (postList.map((post: PostType) => (
                    <Post key={post.id} post ={post} onClick={() => onPostDelete(post.id)}></Post>
    
                )))
                }
            </div>
            <Paging></Paging>
            <ReloadButton ></ReloadButton>            
        </div>
    )
}

const SNotFoundDiv = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`