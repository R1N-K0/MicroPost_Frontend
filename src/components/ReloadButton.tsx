import styled from "styled-components"
import { usePostList } from "../hooks/usePostList"



export default function ReloadButton() {
    const {getPostList} = usePostList()
    
    const onReloadClick = async() => {
        await getPostList(0)
    }
    return (
        <>
            <SReloadButton><button onClick={onReloadClick}>更新</button></SReloadButton>
        </>
    )
}

const SReloadButton = styled.div `
    margin-top: 20px
`