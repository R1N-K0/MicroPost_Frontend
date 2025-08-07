import { useState, createContext, Dispatch, SetStateAction } from "react";
import {ReactNode}  from "react";
import React from "react";


export type PostType = {
    id: number,
    user_name: string,
    content: string,
    created_at: Date
}

type Props = {
    children: ReactNode | ReactNode[]
}


export const PostContext = createContext({} as {
    postList: PostType[],
    setPostList: Dispatch<SetStateAction<PostType[]>>
});

export const PostProvider = (props: Props) => {
    const {children} = props

    const [postList, setPostList] = useState<PostType[]>([])
    return (
        <>
            <PostContext.Provider value={{postList, setPostList}}>{children}</PostContext.Provider>
        </>
    )
}