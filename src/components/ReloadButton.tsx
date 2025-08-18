import { usePostList } from "../hooks/usePostList"



export default function ReloadButton() {
    const {getPostList} = usePostList()
    
    const onReloadClick = async() => {
        await getPostList(0)
    }
    return (
        <>
           <button onClick={onReloadClick} className="my-5 border border-gray-300 rounded-sm shadow-sm text-gray-900 px-2 hover:border-gray-700">更新</button>
        </>
    )
}

