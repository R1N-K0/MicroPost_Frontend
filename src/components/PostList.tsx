import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import styled from "styled-components";
import Paging from "./Paging"
import { PageContext } from "../providers/PageProvider";
import ReloadButton from "./ReloadButton";
import { usePostList } from "../hooks/usePostList";

export default function PostList() {
    const {postList} = useContext(PostContext);

    const {getPostList} = usePostList()

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

