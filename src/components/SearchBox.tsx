import { useContext, useState } from "react"
import { PostContext } from "../providers/PostListProvider"
import { usePostList } from "../hooks/usePostList"

export default function SearchBox() {
    const {keyword, setKeyword}=useContext(PostContext)
    const {getPostList} = usePostList()
    

    const onSearchClick = async() => {
        await getPostList();
    }    

    return (
        <>
            <div>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="検索"/>
                <button onClick={onSearchClick}>検索</button>
            </div>
        </>
    )
}