import { createContext, useContext, useEffect, useRef, useState } from "react";




const SignContext = createContext()


export const SignProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [pagesDropdown, setPagesDropdown] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const profileRef = useRef(null)






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
        localStorage.removeItem("BearToken")
        setAuthenticated(false)
    }

    return (
        <SignContext.Provider value={{ isAuth, isAuthenticated, logout, dropdownRef, profileRef, pagesDropdown, profileDropdown, setPagesDropdown, setProfileDropdown}}>
            {children}
        </SignContext.Provider>
    )
}

export const useSign = () => useContext(SignContext)