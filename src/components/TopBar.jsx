import React, { useEffect, useState } from 'react'
import { MapPin, Phone, ShieldAlert, Tags } from 'lucide-react';
import { axiosinstance } from '../config/axios';

const TopBar = () => {

    const [contact, setContact] = useState({})


    const fetchContact = async () => {
        try {
            const response = await axiosinstance.get('contact/')
            setContact(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])


    return (
        <div className="bg-[#031e2d] text-slate-200 text-xs">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3 sm:gap-6">
                    <span className="opacity-90 flex items-center gap-2"><Tags className='w-4' /> Emergency: 24/7 Support</span>
                </div>
                <ul className="flex items-center gap-3 sm:gap-6 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-white/20">
                    <li className="hidden sm:flex items-center gap-2"><MapPin className='w-4' /><span className="truncate max-w-[180px] md:max-w-none">{contact.hospital?.address}</span></li>
                    <li className="flex items-center gap-2 border-l pl-3 border-white/20"><ShieldAlert className='w-4' /><span>Emergency: {contact.emergency_phone}</span></li>
                    <li className="flex items-center gap-2 border-l pl-3 border-white/20"><Phone className='w-4' /><span>{contact.primary_phone}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default TopBar



