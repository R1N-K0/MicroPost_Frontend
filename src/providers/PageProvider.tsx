import { useState, createContext, Dispatch, SetStateAction } from "react";
import {ReactNode}  from "react";
import React from "react";

type Props = {
    children: ReactNode | ReactNode[]
}

export const PageContext = createContext({} as {
    index: number,
    setIndex: Dispatch<SetStateAction<number>>
});


export default function PageProvider(props: Props) {
    const {children} = props

    const [index,setIndex] = useState<number>(0)
    
    return (
        <>
            <PageContext.Provider value = {{index, setIndex}}>{children}</PageContext.Provider>
        </>
    )
}