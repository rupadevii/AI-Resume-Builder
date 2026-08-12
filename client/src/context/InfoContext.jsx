import { createContext, useContext, useEffect, useState } from "react";
import { initialState } from "../data/initialState";

const InfoContext = createContext()

export const InfoProvider = ({children}) => {
    
    const [info, setInfo] = useState(() => {
        return JSON.parse(localStorage.getItem("info")) || initialState
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("info", JSON.stringify(info))
            console.log("saved...")
        }, 2000)

        return () => clearTimeout(timer)

    }, [info])

    function clearMockData(){
        localStorage.setItem("info", JSON.stringify(initialState))
        // localStorage.removeItem("info")
        setInfo(initialState)
    }

    return (
        <InfoContext.Provider value={{info, setInfo, clearMockData, initialState}}>
            {children}
        </InfoContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInfo = () => useContext(InfoContext)

