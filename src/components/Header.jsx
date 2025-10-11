import { Menu, X, ChevronDown, User as UserIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hlogo from '../assets/hlogo.png'
import { useSign } from '../context/SignContext'
import toast from 'react-hot-toast'
import { div, span } from 'framer-motion/client'
import { axiosinstance } from '../config/axios'

const Header = () => {
    const { isAuthenticated, logout } = useSign()
    const [open, setOpen] = useState(false)
    const [pagesDropdown, setPagesDropdown] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const profileRef = useRef(null)
    const [togleone, setTogleone] = useState("togle-box active")
    const [togletwo, setTogletwo] = useState("togle-box")
    const [profileImage, setProfileImage] = useState(null)
    const [profileImageLoading, setProfileImageLoading] = useState(false)








    // Function to refresh profile image (can be called from other components)
    const refreshProfileImage = async () => {
        if (!token) return

        try {
            setProfileImageLoading(true)
            const response = await axiosinstance.get('profile/', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.status_code === 6000 && response.data.data.profile_image) {
                setProfileImage(response.data.data.profile_image)
            }
        } catch (error) {
            console.log('Profile image refresh error:', error)
        } finally {
            setProfileImageLoading(false)
        }
    }

    const togleOne = () => {
        setTogleone("togle-box active")
        setTogletwo("togle-box")
    }

    const togleTwo = () => {
        setTogletwo("togle-box active")
        setTogleone("togle-box")
    }











    const token = localStorage.getItem('Token')

    useEffect(() => {
        if (isAuthenticated) {
            refreshProfileImage()
        }
    }, [token, isAuthenticated])

    // Listen for profile image updates from other components
    useEffect(() => {
        const handleProfileImageUpdate = () => {
            refreshProfileImage()
        }

        window.addEventListener('profileImageUpdated', handleProfileImageUpdate)
        return () => {
            window.removeEventListener('profileImageUpdated', handleProfileImageUpdate)
        }
    }, [])










    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setPagesDropdown(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])









    

    return (
        <header className="absolute inset-x-0 top-16 md:top-10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex items-center justify-between h-16 px-1">
                    <div className="flex items-center">
                        <img src={hlogo} alt="MedAxis Hospital" className="h-24 w-24 object-contain" />
                        <span className="font-semibold text-white">MedAxis</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-11 text-sm">
                        <Link to={'/'} className="text-white/90 hover:text-white">Home</Link>
                        <Link to={'/user/appointments'} className="text-white/90 hover:text-white">Appointments</Link>
                        <Link to={'doctors'} className="text-white/90 hover:text-white">Doctors</Link>
                        <Link to={'contacts'} className="text-white/90 hover:text-white">Contact</Link>



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
                                    to={'/testimonials'}
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                                >
                                    Testimonials
                                </Link>
                                <Link
                                    to={'about'}
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                                >
                                    About Us
                                </Link>
                                <Link
                                    to={'departments'}
                                    onClick={() => setPagesDropdown(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors"
                                >
                                    Departments
                                </Link>
                            </div>
                        </div>
                    </nav>




                    <div className="hidden md:flex items-center gap-5">
                        {isAuthenticated ? (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={'departments'}
                                        className="px-4 py-3 rounded-full border mr-0 md:mr-10 border-white/40 hover:bg-white/10 text-white text-sm transition-all duration-200"
                                    >
                                        Book Appointment
                                    </Link>
                                </motion.div>
                                <div className="relative" ref={profileRef}>
                                    <motion.button
                                        onClick={() => setProfileDropdown(!profileDropdown)}
                                        onMouseEnter={() => {
                                            setProfileDropdown(true)
                                            setPagesDropdown(false)
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="p-[2px] rounded-full bg-gradient-to-tr from-red-500 via-yellow-400 to-blue-500 shadow-sm hover:shadow-lg transition-shadow duration-200"
                                        aria-haspopup="menu"
                                        aria-expanded={profileDropdown}
                                    >
                                        {profileImageLoading ? (
                                            <span className="flex h-9 w-9 rounded-full bg-slate-900 items-center justify-center text-white animate-pulse">
                                                <UserIcon className="w-5 h-5" />
                                            </span>
                                        ) : profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="h-9 w-9 rounded-full object-cover"
                                                onError={() => setProfileImage(null)}
                                            />
                                        ) : (
                                            <span className="flex h-9 w-9 rounded-full bg-slate-900 items-center justify-center text-white">
                                                <UserIcon className="w-5 h-5" />
                                            </span>
                                        )}
                                    </motion.button>
                                    <div
                                        className={`absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${profileDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                            }`}
                                    >
                                        <Link to={'/user/profile'} onClick={() => setProfileDropdown(false)} className="block px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors border-b border-gray-200">Profile</Link>
                                        <button onClick={() => { setProfileDropdown(false); logout(); }} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#031e2d] hover:text-white transition-colors">Logout</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={'login'}
                                        onMouseEnter={togleOne}
                                        className={`text-white text-sm ${togleone} hover:text-blue-300 transition-colors duration-200`}
                                    >
                                        Sign in
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={'register'}
                                        onMouseEnter={togleTwo}
                                        className={`text-white text-sm ${togletwo} hover:text-green-300 transition-colors duration-200`}
                                    >
                                        Sign up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    <motion.button
                        onClick={() => setOpen(!open)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/90 hover:bg-white/10 transition-all duration-200"
                        aria-label="Toggle Menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {open ? <X /> : <Menu />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>














            {open && (
                <div id="mobile-menu" className="md:hidden px-4 sm:px-6 lg:px-8">
                    <div className="mt-2 rounded-xl bg-slate-900/90 backdrop-blur-md ring-1 ring-white/10 text-sm text-white">
                        <nav className="flex flex-col p-3">
                            <Link to={'home'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Home</Link>
                            <Link to={'/user/appointments'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Appointments</Link>
                            <Link to={'doctors'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Doctors</Link>
                            <Link to={'contacts'} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-white/10">Contact</Link>
                            <Link to={'testimonials'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Testimonials</Link>
                            <Link to={'about'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">About Us</Link>
                            <Link to={'departments'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Departments</Link>


                            <div className="mt-2 border-t border-white/10" />
                            {isAuthenticated ? (
                                <div className="p-3">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="p-[2px] rounded-full bg-gradient-to-tr from-red-500 via-yellow-400 to-blue-500">
                                            {profileImageLoading ? (
                                                <span className="flex h-9 w-9 rounded-full bg-slate-800 items-center justify-center text-white animate-pulse">
                                                    <UserIcon className="w-5 h-5" />
                                                </span>
                                            ) : profileImage ? (
                                                <img
                                                    src={profileImage}
                                                    alt="Profile"
                                                    className="h-9 w-9 rounded-full object-cover"
                                                    onError={() => setProfileImage(null)}
                                                />
                                            ) : (
                                                <span className="flex h-9 w-9 rounded-full bg-slate-800 items-center justify-center text-white">
                                                    <UserIcon className="w-5 h-5" />
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-white/90 text-sm">Account</span>
                                    </div>
                                    <Link to={'/user/profile'} onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-white/10 text-sm">Profile</Link>
                                    <button onClick={() => { setOpen(false); logout(); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm">Logout</button>
                                </div>
                            ) : (
                                <div className="flex gap-2 p-3">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-1"
                                    >
                                        <Link
                                            to={'/login'}
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-2 rounded-lg border border-white/30 text-white text-center hover:bg-white/10 transition-all duration-200"
                                        >
                                            Sign in
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-1"
                                    >
                                        <Link
                                            to={'/register'}
                                            onClick={() => setOpen(false)}
                                            className="block btn-primary text-center transition-all duration-200"
                                        >
                                            Sign up
                                        </Link>
                                    </motion.div>
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
