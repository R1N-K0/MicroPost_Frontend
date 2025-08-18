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
            <div className="flex items-center justify-end space-x-2 w-full pe-5">
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="検索"
                className="block px-4 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                <button onClick={onSearchClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-0.5">検索</button>
            </div>
        </>
    )
}