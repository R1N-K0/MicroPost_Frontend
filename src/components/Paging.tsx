import {useContext } from "react"
import styled from "styled-components";
import { PageContext } from "../providers/PageProvider";
import { usePostList } from "../hooks/usePostList";



export default function Paging() {
    const {index} = useContext(PageContext)

    const {getPostList} = usePostList()

    const onNextClick = async() => {
        const start = index + 10
        await getPostList(start)
    }    

    const onPrevClick = async() => {
        const start = index - 10
        if(start < 0) return
        await getPostList(start)
    }
    
    
    return (
        <>
            <SRow>
                <button onClick={onPrevClick} className="bg-gray-800 text-sm text-white rounded-l-md py-1 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">前のページへ</button>
                <span>{index + 1}</span>
                <button onClick={onNextClick} className="bg-gray-800 text-sm text-white rounded-r-md py-1 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">次のページへ</button>
            </SRow>
        </>
    )
}



const SRow = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;  
`
