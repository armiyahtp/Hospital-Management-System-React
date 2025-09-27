import { createContext, useContext, useEffect, useRef, useState } from "react";




const SignContext = createContext()


export const SignProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    



    const isAuth = (token) => {
        localStorage.setItem('Token', token)
    }


    useEffect(() => {
        const token = localStorage.getItem("Token")
        if (token) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [])



    const logout = () => {
        localStorage.removeItem("Token")
        setAuthenticated(false)
    }

    return (
        <SignContext.Provider value={{ isAuth, isAuthenticated, logout}}>
            {children}
        </SignContext.Provider>
    )
}

export const useSign = () => useContext(SignContext)