import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosinstance } from '../config/axios'
import {
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    Calendar,
    User,
    Stethoscope,
    Building,
    Star,
    Clock,
    Users
} from 'lucide-react'

export const SingleDepartment = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState({})
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const token = localStorage.getItem('Token')
    const num = Number(id)

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                setLoading(true)
                const response = await axiosinstance.get(`department/${num}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setDepartment(response.data.department)
                setDoctors(response.data.doctors)
                setError(null)
            } catch (error) {
                console.log(error)
                setError('Failed to fetch department details')
            } finally {
                setLoading(false)
            }
        }
        fetchDepartment()
    }, [])









    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading department details...</p>
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
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>

                        <div className="flex items-center justify-center mb-6">
                            <img
                                src={department.logo}
                                alt={department.name}
                                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            {department.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hospital Information Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Hospital Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={department.hospital?.logo}
                                    alt={department.hospital?.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{department.hospital?.name}</h3>
                                    <p className="text-gray-600">Hospital</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span>{department.hospital?.address}, {department.hospital?.city} - {department.hospital?.postal_code}</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="w-5 h-5 text-blue-600" />
                                <span>Registration Fee: ₹{department.hospital?.registration_fee}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-800 mb-3">Department Stats</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Doctors:</span>
                                    <span className="font-semibold text-blue-600">{doctors.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Department ID:</span>
                                    <span className="font-semibold text-gray-800">#{department.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Doctors Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Our Doctors</h2>
                    </div>

                    {doctors.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Available</h3>
                            <p className="text-gray-500">There are currently no doctors in this department.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.map((doctor, index) => (
                                <motion.div
                                    key={doctor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={doctor.profile_image}
                                                alt={`${doctor.first_name} ${doctor.last_name}`}
                                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {doctor.first_name} {doctor.last_name}
                                                </h3>
                                                <p className="text-gray-600">Doctor</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm">{doctor.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm">{doctor.phone_number}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm">{doctor.availabilities?.length || 0} Available Days</span>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-4 mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-semibold text-blue-800">Available Days</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {doctor.availabilities?.slice(0, 3).map((day, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                    >
                                                        Day {day}
                                                    </span>
                                                ))}
                                                {doctor.availabilities?.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        +{doctor.availabilities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/user/doctors/${doctor.id}`}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                                        >
                                            <User className="w-4 h-4" />
                                            View Profile
                                        </Link>
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
