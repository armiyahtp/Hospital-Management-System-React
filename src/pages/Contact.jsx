import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Phone,
    MapPin,
    Clock,
    Mail,
    Building2,
    Star,
    Navigation,
    CreditCard,
    Shield,
    CheckCircle
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

export const Contact = () => {
    const [contact, setContact] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchContact = async () => {
        try {
            setLoading(true)
            const response = await axiosinstance.get('contact/')
            setContact(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Get in touch with MedAxis Hospital for all your healthcare needs
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hospital Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {contact.hospital?.logo && (
                                <div className="w-20 h-20 bg-white rounded-2xl p-4 flex items-center justify-center">
                                    <img
                                        src={contact.hospital.logo}
                                        alt="Hospital Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    {contact.hospital?.name || 'MedAxis Hospital'}
                                </h2>
                                <p className="text-blue-100 text-lg">
                                    Your Trusted Healthcare Partner
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-2">Address</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {contact.hospital?.address}<br />
                                        {contact.hospital?.city}, {contact.hospital?.postal_code}
                                    </p>
                                </div>
                            </div>

                            {/* Primary Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-2">Primary Contact</h3>
                                    <p className="text-gray-600 text-lg font-medium">
                                        {contact.primary_phone}
                                    </p>
                                </div>
                            </div>

                            {/* Emergency Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-2">Emergency</h3>
                                    <p className="text-gray-600 text-lg font-medium">
                                        {contact.emergency_phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {/* Registration Fee */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Registration Fee</h3>
                        <p className="text-2xl font-bold text-purple-600">
                            ₹{contact.hospital?.registration_fee}
                        </p>
                    </div>

                    {/* 24/7 Service */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">24/7 Service</h3>
                        <p className="text-gray-600">Round the clock healthcare</p>
                    </div>

                    {/* Active Status */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Status</h3>
                        <p className="text-green-600 font-medium">
                            {contact.is_active ? 'Active' : 'Inactive'}
                        </p>
                    </div>

                    {/* Quality Assurance */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Quality</h3>
                        <p className="text-gray-600">Certified healthcare</p>
                    </div>
                </motion.div>

                {/* Contact Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Need Immediate Assistance?
                    </h3>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Our dedicated team is here to help you 24/7. Don't hesitate to reach out for any medical emergency or inquiry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href={`tel:${contact.primary_phone}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
                        >
                            <Phone className="w-5 h-5" />
                            Call Now
                        </motion.a>
                        <motion.a
                            href={`tel:${contact.emergency_phone}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-3"
                        >
                            <Phone className="w-5 h-5" />
                            Emergency
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
