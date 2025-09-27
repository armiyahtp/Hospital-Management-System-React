import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { axiosinstance } from '../config/axios'
import {
    User,
    Mail,
    Phone,
    Calendar,
    Stethoscope,
    Building,
    Clock,
    Users,
    Search,
    Filter
} from 'lucide-react'

export const Doctor = () => {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true)
                const response = await axiosinstance.get('doctors/')
                setDoctors(response.data.data)
                setDepartments(response.data.departments)
                setError(null)
            } catch (error) {
                console.log(error)
                setError('Failed to fetch doctors')
            } finally {
                setLoading(false)
            }
        }
        fetchDoctors()
    }, [])







    // Filter doctors based on search term and department
    const filteredDoctors = (doctors || []).filter(doctor => {
        const matchesSearch =
            doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.department.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesDepartment = selectedDepartment === '' || doctor.department.name === selectedDepartment
        return matchesSearch && matchesDepartment
    })






    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading doctors...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
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
                                <Users className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Medical Team</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Meet our experienced doctors dedicated to providing exceptional healthcare services
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search doctors by name or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Department Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
                            >
                                <option value="">All Departments</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.name}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Showing {filteredDoctors.length} of {doctors.length} doctors</span>
                        {(searchTerm || selectedDepartment) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedDepartment('')
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </motion.div>












                {/* Doctors Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {filteredDoctors.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || selectedDepartment
                                    ? "Try adjusting your search criteria"
                                    : "There are currently no doctors available"
                                }
                            </p>
                            {(searchTerm || selectedDepartment) && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedDepartment('')
                                    }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDoctors.map((doctor, index) => (
                                <motion.div
                                    key={doctor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="p-6">
                                        {/* Doctor Profile */}
                                        <div className="text-center mb-6">
                                            <div className="relative inline-block">
                                                <img
                                                    src={doctor.profile_image}
                                                    alt={`${doctor.first_name} ${doctor.last_name}`}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mx-auto group-hover:border-blue-300 transition-colors"
                                                />
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <Stethoscope className="w-4 h-4 text-white" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-800 mt-4 group-hover:text-blue-600 transition-colors">
                                                {doctor.first_name} {doctor.last_name}
                                            </h3>

                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                <img
                                                    src={doctor.department.logo}
                                                    alt={doctor.department.name}
                                                    className="w-6 h-6 rounded-full object-cover"
                                                />
                                                <span className="text-blue-600 font-medium text-sm">
                                                    {doctor.department.name}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span className="text-sm truncate">{doctor.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span className="text-sm">{doctor.phone_number}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span className="text-sm">
                                                    {doctor.availabilities?.length || 0} Available Days
                                                </span>
                                            </div>
                                        </div>


                                        {/* Hospital Info */}
                                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Building className="w-4 h-4 text-gray-600" />
                                                <span className="text-sm font-semibold text-gray-800">Hospital</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={doctor.department.hospital.logo}
                                                    alt={doctor.department.hospital.name}
                                                    className="w-5 h-5 rounded object-cover"
                                                />
                                                <span className="text-sm text-gray-600">{doctor.department.hospital.name}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-2">
                                            <Link
                                                to={`/user/doctors/${doctor.id}`}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                                            >
                                                <User className="w-4 h-4" />
                                                View Profile
                                            </Link>

                                            <Link
                                                to={`/user/department/${doctor.department.id}`}
                                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                                            >
                                                <Building className="w-4 h-4" />
                                                View Department
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
