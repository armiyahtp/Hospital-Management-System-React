import React from 'react'
import Header from '../components/Header'
import TopBar from '../components/TopBar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div>
            <TopBar />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserLayout
