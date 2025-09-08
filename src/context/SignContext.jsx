import { createContext, useContext } from "react";




const SignContext = createContext()


export const SignProvider = ({ children }) => {
    const isAuth = (token) => {
        localStorage.setItem('Token', token)
    }


    return (
        <SignContext.Provider value={{ isAuth }}>
            {children}
        </SignContext.Provider>
    )
}

export const useSign = () => useContext(SignContext)