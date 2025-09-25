import { Menu, X, ChevronDown, User as UserIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hlogo from '../assets/hlogo.png'
import { useSign } from '../context/SignContext'

const Header = () => {
    const { isAuthenticated, logout, dropdownRef, profileRef, pagesDropdown, profileDropdown, setPagesDropdown, setProfileDropdown } = useSign()
    const [open, setOpen] = useState(false)
    const [togleone, setTogleone] = useState("togle-box")
    const [togletwo, setTogletwo] = useState("")

    const togleOne = () => {
        setTogleone("togle-box")
        setTogletwo("")
    }

    const togleTwo = () => {
        setTogletwo("togle-box")
        setTogleone("")
    }

    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setPagesDropdown(false)
            }
            if (!profileRef.current.contains(event.target)) {
                setProfileDropdown(false)
            }
        }
    }, [pagesDropdown, profileDropdown])

    return (
        <header className="absolute inset-x-0 top-16 md:top-10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex items-center justify-between h-16 px-1">
                    <div className="flex items-center">
                        <img src={hlogo} alt="MedAxis Hospital" className="h-24 w-24 object-contain" />
                        <span className="font-semibold text-white">MedAxis</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link to={'/'} className="text-white/90 hover:text-white">Home</Link>
                        <Link className="text-white/90 hover:text-white">Appointments</Link>
                        <Link className="text-white/90 hover:text-white">Doctors</Link>
                        <Link className="text-white/90 hover:text-white">Contact</Link>

                        {/* Pages Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onMouseEnter={() => {
                                    setPagesDropdown(true)
                                    setProfileDropdown(false)
                                }}
                                onClick={() => setPagesDropdown(!pagesDropdown)}
                                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
                            >
                                Pages
                                <ChevronDown className={`w-4 h-4 transition-transform ${pagesDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute top-full left-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${pagesDropdown
                                    ? 'opacity-100 visible translate-y-0'
                                    : 'opacity-0 invisible -translate-y-2'
                                    }`}
                            >
                                <Link
                                    to="/testimonials"
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                                >
                                    Testimonials
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/departments"
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors"
                                >
                                    Departments
                                </Link>
                            </div>
                        </div>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <div>
                                    <Link to={'/appointments'} className="px-4 py-2 rounded-full border border-white/40 hover:bg-white/10 text-white text-sm">Book Appointment</Link>
                                </div>
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setProfileDropdown(!profileDropdown)}
                                        onMouseEnter={() => {
                                            setProfileDropdown(true)
                                            setPagesDropdown(false)
                                        }}
                                        className="p-[2px] rounded-full bg-gradient-to-tr from-red-500 via-yellow-400 to-blue-500 shadow-sm"
                                        aria-haspopup="menu"
                                        aria-expanded={profileDropdown}
                                    >
                                        <span className="flex h-9 w-9 rounded-full bg-slate-900 items-center justify-center text-white">
                                            <UserIcon className="w-5 h-5" />
                                        </span>
                                    </button>
                                    <div
                                        className={`absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${profileDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                            }`}
                                    >
                                        <Link to={'/profile'} onClick={() => setProfileDropdown(false)} className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200">Profile</Link>
                                        <button onClick={() => { setProfileDropdown(false); logout(); }} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors">Logout</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={'login'} onMouseEnter={togleOne} className={`text-white text-sm ${togleone}`}>Sign in</Link>
                                <Link to={'register'} onMouseEnter={togleTwo} className={`text-white text-sm ${togletwo}`}>Sign up</Link>
                            </>
                        )}
                    </div>

                    <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/90 hover:bg-white/10" aria-label="Toggle Menu" aria-expanded={open} aria-controls="mobile-menu">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {open && (
                <div id="mobile-menu" className="md:hidden px-4 sm:px-6 lg:px-8">
                    <div className="mt-2 rounded-xl bg-slate-900/90 backdrop-blur-md ring-1 ring-white/10 text-sm text-white">
                        <nav className="flex flex-col p-3">
                            <Link to={'home'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Home</Link>
                            <Link to={'/appointments'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Appointments</Link>
                            <Link to={'/doctors'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Doctors</Link>
                            <Link to={'/contact'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Contact</Link>
                            <Link to={'/testimonials'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Testimonials</Link>
                            <Link to={'/about'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">About Us</Link>
                            <Link to={'/departments'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Departments</Link>


                            <div className="mt-2 border-t border-white/10" />
                            {isAuthenticated ? (
                                <div className="p-3">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="p-[2px] rounded-full bg-gradient-to-tr from-red-500 via-yellow-400 to-blue-500">
                                            <span className="flex h-9 w-9 rounded-full bg-slate-800 items-center justify-center text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25a4.5 4.5 0 0 0-4.5 4.5v.75a4.5 4.5 0 1 0 9 0V6.75A4.5 4.5 0 0 0 12 2.25ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75v-.75Z" clipRule="evenodd" /></svg>
                                            </span>
                                        </span>
                                        <span className="text-white/90 text-sm">Account</span>
                                    </div>
                                    <Link to={'/profile'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Profile</Link>
                                    <button onClick={() => { setOpen(false); logout(); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm">Logout</button>
                                </div>
                            ) : (
                                <div className="flex gap-2 p-3">
                                    <Link to={'/login'} onClick={() => setOpen(false)} className="flex-1 px-4 py-2 rounded-lg border border-white/30 text-white text-center hover:bg-white/10">Sign in</Link>
                                    <Link to={'/register'} onClick={() => setOpen(false)} className="flex-1 btn-primary text-center">Sign up</Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
