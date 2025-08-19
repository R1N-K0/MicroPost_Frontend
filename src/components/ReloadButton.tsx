import { usePostList } from "../hooks/usePostList"



export default function ReloadButton() {
    const {getPostList} = usePostList()
    
    const onReloadClick = async() => {
        await getPostList(0)
    }
    return (
        <>
           <button onClick={onReloadClick} className="my-5 border border-gray-300 rounded-sm  shadow-md text-gray-700  px-4  hover:border-gray-400 transition-colors duration-300">更新</button>
        </>
    )
}

