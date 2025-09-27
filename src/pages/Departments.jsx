import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { axiosinstance } from '../config/axios'
import {
    Building,
    Stethoscope,
    Users,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Search,
    Filter,
    Hospital
} from 'lucide-react'

export const Departments = () => {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true)
                const response = await axiosinstance.get('departments/')
                setDepartments(response.data.data)
                setError(null)
            } catch (error) {
                console.log(error)
                setError('Failed to fetch departments')
            } finally {
                setLoading(false)
            }
        }
        fetchDepartments()
    }, [])

    // Filter departments based on search term
    const filteredDepartments = (departments || []).filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading departments...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Departments</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <Building className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Departments</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Explore our specialized medical departments and find the right care for your needs
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search departments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Filter className="w-4 h-4" />
                            <span>{filteredDepartments.length} departments found</span>
                        </div>
                    </div>
                </motion.div>








                {/* Departments Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredDepartments.map((dept, index) => (
                        <motion.div
                            key={dept.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group"
                        >
                            <Link to={`/user/department/${dept.id}`}>
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                                    {/* Department Logo */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 overflow-hidden">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-16 h-16 bg-blue-300 rounded-full blur-xl"></div>
                                            <div className="absolute bottom-4 right-4 w-12 h-12 bg-indigo-300 rounded-full blur-lg"></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400 rounded-full blur-md"></div>
                                        </div>

                                        {/* Logo Container */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {dept.logo ? (
                                                <div className="relative">
                                                    {/* Outer Glow Effect */}
                                                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-60 scale-110"></div>

                                                    {/* Logo Container with Multiple Shadows */}
                                                    <div className="relative w-24 h-24 bg-white rounded-full shadow-2xl shadow-blue-200/50 border-4 border-white/80 flex items-center justify-center overflow-hidden">
                                                        {/* Inner Shadow */}
                                                        <div className="absolute inset-0 rounded-full shadow-inner shadow-gray-200/30"></div>

                                                        {/* Logo Image */}
                                                        <img
                                                            src={dept.logo}
                                                            alt={dept.name}
                                                            className="w-16 h-16 object-contain relative z-10"
                                                        />

                                                        {/* Shine Effect */}
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                                                    </div>

                                                    {/* Floating Elements */}
                                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
                                                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    {/* Outer Glow Effect */}
                                                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-60 scale-110"></div>

                                                    {/* Fallback Icon Container */}
                                                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl shadow-blue-300/50 border-4 border-white/80 flex items-center justify-center">
                                                        <Stethoscope className="w-12 h-12 text-white drop-shadow-lg" />

                                                        {/* Shine Effect */}
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
                                                    </div>

                                                    {/* Floating Elements */}
                                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
                                                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <div className="absolute top-4 right-4">
                                            <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg shadow-blue-200/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Decorative Elements */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                                                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-80"></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Department Info */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Hospital className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {dept.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">Medical Department</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {dept.description}
                                        </p>

                                        {/* Hospital Info */}
                                        <div className="border-t pt-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Building className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700">{dept.hospital.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{dept.hospital.address}, {dept.hospital.city}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">Registration Fee: ₹{dept.hospital.registration_fee}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                                                    View Department
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>





                {/* Empty State */}
                {filteredDepartments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-12"
                    >
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No departments found</h3>
                        <p className="text-gray-500">Try adjusting your search terms</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
