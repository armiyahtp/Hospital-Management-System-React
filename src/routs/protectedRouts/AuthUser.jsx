import React from 'react'
import toast from 'react-hot-toast'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthUser = () => {
    const token = localStorage.getItem('Token')

    if (!token) {
        toast.error("You need to log in first")
        return <Navigate to="/login" replace />
    } else {
        return <Outlet />
    }
}
