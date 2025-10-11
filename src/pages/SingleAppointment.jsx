import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Stethoscope,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
    AlertCircle,
    XCircle,
    FileText,
    Receipt,
    Pill,
    Loader2,
    Download,
    Printer,
    Building,
    CreditCard,
    DollarSign,
    Package,
    Activity,
    Heart,
    Zap,
    Shield,
    Star,
    Award
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

const SingleAppointment = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'details')

    const [appointment, setAppointment] = useState(null)
    const [prescription, setPrescription] = useState(null)
    const [bill, setBill] = useState(null)
    const [loading, setLoading] = useState({
        appointment: false,
        prescription: false,
        bill: false
    })
    const [error, setError] = useState('')

    const token = localStorage.getItem('Token')

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        if (!timeString) return ''
        const [hours, minutes] = timeString.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return <CheckCircle className="w-4 h-4" />
            case 'pending':
                return <AlertCircle className="w-4 h-4" />
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'cancelled':
                return <XCircle className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const fetchAppointmentDetails = async () => {
        try {
            setLoading(prev => ({ ...prev, appointment: true }))
            const response = await axiosinstance.get(`appointments/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setAppointment(response.data.appointment)

        } catch (error) {
            console.error('Error fetching appointment details:', error)
            setError('Failed to load appointment details')
        } finally {
            setLoading(prev => ({ ...prev, appointment: false }))
        }
    }





    const fetchPrescription = async () => {
        try {
            setLoading(prev => ({ ...prev, prescription: true }))
            const response = await axiosinstance.get(`appointments/prescription/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPrescription(response.data.prescriptions)
        } catch (error) {
            console.error('Error fetching prescription:', error)
            setPrescription(null)
        } finally {
            setLoading(prev => ({ ...prev, prescription: false }))
        }
    }







    const fetchBill = async () => {
        try {
            setLoading(prev => ({ ...prev, bill: true }))
            const response = await axiosinstance.get(`appointments/bill/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setBill(response.data.appointment_bill)
        } catch (error) {
            console.error('Error fetching bill:', error)
            setBill(null)
        } finally {
            setLoading(prev => ({ ...prev, bill: false }))
        }
    }






    useEffect(() => {
        if (token && id) {
            fetchAppointmentDetails()
        }
    }, [token, id])







    useEffect(() => {
        if (activeTab === 'prescription' && !prescription) {
            fetchPrescription()
        } else if (activeTab === 'bill' && !bill) {
            fetchBill()
        }
    }, [activeTab])









    const renderAppointmentDetails = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Appointment Hero Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

                <div className="relative p-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                    <Stethoscope className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                                </h1>
                                <p className="text-blue-100 text-lg">{appointment.doctor?.department?.name}</p>
                                <p className="text-blue-200 text-sm mt-1">{appointment.doctor?.specialization}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <span className={`px-6 py-3 rounded-2xl text-sm font-semibold border-2 backdrop-blur-sm flex items-center gap-3 ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                {appointment.status?.toUpperCase()}
                            </span>
                            <div className="text-right text-white">
                                <p className="text-2xl font-bold">{formatDate(appointment.appointment_date)}</p>
                                <p className="text-blue-100">
                                    {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Date Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Appointment Date</p>
                            <p className="text-lg font-bold text-gray-900">{formatDate(appointment.appointment_date)}</p>
                        </div>
                    </div>
                </div>

                {/* Time Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Time Slot</p>
                            <p className="text-lg font-bold text-gray-900">
                                {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hospital Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Hospital</p>
                            <p className="text-lg font-bold text-gray-900">{appointment.doctor?.department?.hospital?.name}</p>
                        </div>
                    </div>
                </div>

                {/* Department Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Department</p>
                            <p className="text-lg font-bold text-gray-900">{appointment.doctor?.department?.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span className="text-white text-xs font-bold">✓</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                            </h2>
                            <p className="text-xl text-blue-600 font-semibold mb-2">{appointment.doctor?.specialization}</p>
                            <p className="text-gray-600 mb-4">{appointment.doctor?.department?.hospital?.name}</p>
                            <div className="flex items-center gap-6 text-sm">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    {appointment.doctor?.experience || '10+'} years experience
                                </span>
                                <span className="flex items-center gap-2 text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    ₹{appointment.doctor?.fee || '500'}/consultation
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-gray-900 font-medium">{appointment.doctor?.phone_number}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-900 font-medium">{appointment.doctor?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Professional Details</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Award className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <span className="text-gray-900 font-medium">{appointment.doctor?.qualification || 'MD, MBBS'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Stethoscope className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <span className="text-gray-900 font-medium">{appointment.doctor?.department?.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {appointment.doctor?.description && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">About Doctor</h4>
                            <p className="text-gray-700 leading-relaxed">{appointment.doctor.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )

    const renderPrescription = () => {
        if (loading.prescription) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading prescription...</span>
                </div>
            )
        }

        if (!prescription) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Pill className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescription Available</h3>
                    <p className="text-gray-500">Prescription will be available after the appointment is completed.</p>
                </motion.div>
            )
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Prescription Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

                    <div className="relative p-8">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                        <Pill className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-green-600 flex items-center justify-center">
                                        <span className="text-green-600 text-xs font-bold">RX</span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Medical Prescription</h1>
                                    <p className="text-green-100 text-lg">Prescribed by Dr. {prescription.appointment?.doctor?.first_name} {prescription.appointment?.doctor?.last_name}</p>
                                    <p className="text-green-200 text-sm mt-1">{formatDate(prescription.created_at)}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-2 border border-white/30">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                                <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 flex items-center gap-2">
                                    <Printer className="w-4 h-4" />
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Info Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Patient Name</p>
                                <p className="text-lg font-bold text-gray-900">{prescription.appointment?.patient?.first_name} {prescription.appointment?.patient?.last_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Prescribed by</p>
                                <p className="text-lg font-bold text-gray-900">Dr. {prescription.appointment?.doctor?.first_name} {prescription.appointment?.doctor?.last_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Prescription Date</p>
                                <p className="text-lg font-bold text-gray-900">{formatDate(prescription.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medications */}
                {prescription.items && prescription.items.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <Pill className="w-5 h-5 text-white" />
                                </div>
                                Prescribed Medications
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid gap-6">
                                {prescription.items.map((medication, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-900">{medication.medicine}</h4>
                                                    <p className="text-blue-600 font-medium">{medication.dosage}</p>
                                                </div>
                                            </div>
                                            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold">
                                                {medication.frequency}
                                            </span>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <h5 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                Instructions
                                            </h5>
                                            <p className="text-blue-800 leading-relaxed">{medication.instructions}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Diagnosis */}
                {prescription.title && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-white" />
                                </div>
                                Medical Diagnosis
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                                <p className="text-gray-800 leading-relaxed text-lg">{prescription.title}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                {prescription.instructions && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                Doctor's Instructions
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                <p className="text-gray-800 leading-relaxed text-lg">{prescription.instructions}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Follow-up */}
                {prescription.duration && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                Follow-up Appointment
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-purple-900 font-semibold text-lg">Next appointment recommended:</p>
                                        <p className="text-2xl font-bold text-gray-900">After {prescription.duration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        )
    }

    const renderBill = () => {
        if (loading.bill) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading bill...</span>
                </div>
            )
        }

        if (!bill) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Receipt className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Bill Available</h3>
                    <p className="text-gray-500">Bill will be available after the appointment is completed.</p>
                </motion.div>
            )
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Professional Invoice Header */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Invoice Header with Hospital Logo */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <Building className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{bill.doctor?.department?.hospital?.name}</h2>
                                    <p className="text-blue-100">Medical Invoice</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-100 text-sm">Invoice #</p>
                                <p className="text-lg font-semibold">{bill.bill_number}</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient and Doctor Information */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                            {/* Patient Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-500" />
                                    Patient Information
                                </h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">
                                        {bill.patient?.first_name} {bill.patient?.last_name}
                                    </p>
                                    <p className="text-gray-600">Age: {bill.patient?.age} • Gender: {bill.patient?.gender}</p>
                                    <p className="text-gray-600">Phone: {bill.patient?.phone_number}</p>
                                    <p className="text-gray-600">Place: {bill.patient?.place}</p>
                                </div>
                            </div>

                            {/* Doctor Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Stethoscope className="w-5 h-5 text-green-500" />
                                    Doctor Information
                                </h3>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">
                                        Dr. {bill.doctor?.first_name} {bill.doctor?.last_name}
                                    </p>
                                    <p className="text-gray-600">Department: {bill.doctor?.department?.name}</p>
                                    <p className="text-gray-600">Specialization: {bill.doctor?.specialization}</p>
                                    <p className="text-gray-600">Experience: {bill.doctor?.experience} years</p>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-purple-500" />
                                Appointment Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Date</p>
                                    <p className="font-medium">{formatDate(bill.appointment?.appointment_date)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Time</p>
                                    <p className="font-medium">
                                        {formatTime(bill.appointment?.start_time)} - {formatTime(bill.appointment?.end_time)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.appointment?.status)}`}>
                                        {bill.appointment?.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bill Items - Professional Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-purple-500" />
                            Bill Breakdown
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* Consultation Fee */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                <Stethoscope className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">Consultation Fee</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">Doctor consultation and examination</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                        ₹{bill.consultation_fee}
                                    </td>
                                </tr>

                                {/* Medicines */}
                                {bill.medicines_total && parseFloat(bill.medicines_total) > 0 && (
                                    <>
                                        {bill.medicine_items && bill.medicine_items.length > 0 ? (
                                            bill.medicine_items.map((item, index) => (
                                                <tr key={`medicine-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Pill className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.medicine_name}</div>
                                                                <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Prescribed medication</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Pill className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Medicines</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Prescribed medications</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.medicines_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Tests */}
                                {bill.tests_total && parseFloat(bill.tests_total) > 0 && (
                                    <>
                                        {bill.test_items && bill.test_items.length > 0 ? (
                                            bill.test_items.map((item, index) => (
                                                <tr key={`test-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Activity className="w-4 h-4 text-purple-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.test_name}</div>
                                                                <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Laboratory test</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Activity className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Tests</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Laboratory tests and diagnostics</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.tests_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Injections */}
                                {bill.injections_total && parseFloat(bill.injections_total) > 0 && (
                                    <>
                                        {bill.injection_items && bill.injection_items.length > 0 ? (
                                            bill.injection_items.map((item, index) => (
                                                <tr key={`injection-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Zap className="w-4 h-4 text-red-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.injection_name}</div>
                                                                <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Vaccination/Injection</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Zap className="w-4 h-4 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Injections</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Vaccinations and injections</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.injections_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Surgery */}
                                {bill.surgery_total && parseFloat(bill.surgery_total) > 0 && (
                                    <>
                                        {bill.surgery_items && bill.surgery_items.length > 0 ? (
                                            bill.surgery_items.map((item, index) => (
                                                <tr key={`surgery-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Shield className="w-4 h-4 text-orange-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.surgery_name}</div>
                                                                <div className="text-xs text-gray-500">
                                                                    OT: {item.ot_hours}h × ₹{item.ot_charge_per_hour} + Surgeon: ₹{item.surgeon_fee}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">
                                                            OT Hours: {item.ot_hours}h | Anesthesia: ₹{item.anesthesia_fee} | Others: ₹{item.other_charges}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Shield className="w-4 h-4 text-orange-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Surgery</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Surgical procedures</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.surgery_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Intravenous */}
                                {bill.intravenous_total && parseFloat(bill.intravenous_total) > 0 && (
                                    <>
                                        {bill.intravenous_items && bill.intravenous_items.length > 0 ? (
                                            bill.intravenous_items.map((item, index) => (
                                                <tr key={`iv-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Heart className="w-4 h-4 text-cyan-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.iv_name}</div>
                                                                <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Intravenous therapy</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Heart className="w-4 h-4 text-cyan-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Intravenous</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">IV therapy and fluids</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.intravenous_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Room */}
                                {bill.room_total && parseFloat(bill.room_total) > 0 && (
                                    <>
                                        {bill.room_items && bill.room_items.length > 0 ? (
                                            bill.room_items.map((item, index) => (
                                                <tr key={`room-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Building className="w-4 h-4 text-indigo-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">Room Admission</div>
                                                                <div className="text-xs text-gray-500">Admission: {item.admission}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Hospital room charges</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Building className="w-4 h-4 text-indigo-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Room Charges</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Hospital room and accommodation</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.room_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Nursing */}
                                {bill.nursing_total && parseFloat(bill.nursing_total) > 0 && (
                                    <>
                                        {bill.nursing_items && bill.nursing_items.length > 0 ? (
                                            bill.nursing_items.map((item, index) => (
                                                <tr key={`nursing-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                                                <User className="w-4 h-4 text-pink-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.nursing_care}</div>
                                                                <div className="text-xs text-gray-500">Visits: {item.visits} × ₹{item.charge_per_visit}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Nursing care services</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                                            <User className="w-4 h-4 text-pink-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Nursing Care</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Nursing and care services</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.nursing_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}

                                {/* Other Services */}
                                {bill.misc_total && parseFloat(bill.misc_total) > 0 && (
                                    <>
                                        {bill.misc_items && bill.misc_items.length > 0 ? (
                                            bill.misc_items.map((item, index) => (
                                                <tr key={`misc-${index}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                                <Package className="w-4 h-4 text-gray-600" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.description}</div>
                                                                <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">Additional service</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                        ₹{item.total_price}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                            <Package className="w-4 h-4 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">Other Services</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">Additional services and charges</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                    ₹{bill.misc_total}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Bill Summary */}
                    <div className="bg-gray-50 p-6">
                        <div className="space-y-3">
                            {bill.subtotal && parseFloat(bill.subtotal) > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{bill.subtotal}</span>
                                </div>
                            )}

                            {bill.discount && parseFloat(bill.discount) > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-medium text-green-600">-₹{bill.discount}</span>
                                </div>
                            )}

                            {bill.tax && parseFloat(bill.tax) > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">₹{bill.tax}</span>
                                </div>
                            )}

                            <div className="border-t border-gray-300 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                    <span className="text-lg font-bold text-blue-600">₹{bill.total_amount || bill.consultation_fee}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-500" />
                        Payment Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium capitalize">{bill.payment?.method || 'Card Payment'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount Paid</span>
                                <span className="font-medium text-green-600">₹{bill.payment?.paid_amount || bill.total_amount}</span>
                            </div>
                            {bill.payment?.transaction_id && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-medium text-xs">{bill.payment.transaction_id}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${bill.payment?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {bill.payment?.status === 'completed' ? 'Paid' : bill.status || 'Pending'}
                                </span>
                            </div>
                            {bill.payment?.paid_at && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Paid On</span>
                                    <span className="font-medium text-sm">{formatDate(bill.payment.paid_at)}</span>
                                </div>
                            )}
                            {bill.balance_due && parseFloat(bill.balance_due) > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Balance Due</span>
                                    <span className="font-medium text-red-600">₹{bill.balance_due}</span>
                                </div>
                            )}
                            {bill.balance_due && parseFloat(bill.balance_due) < 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Balance to give</span>
                                    <span className="font-medium text-red-600">₹{bill.balance_due}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                        <button className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                            <Printer className="w-4 h-4" />
                            Print Invoice
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Invoice
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    }

    if (loading.appointment) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        )
    }

    if (error || !appointment) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Appointment Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The appointment you are looking for does not exist.'}</p>
                    <Link
                        to="/user/appointments"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Appointments
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <Link
                            to="/user/appointments"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">Appointment Details</h1>
                            <p className="text-blue-100 mt-2">
                                Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name} • {formatDate(appointment.appointment_date)}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            {[
                                { id: 'details', label: 'Details', icon: FileText },
                                { id: 'prescription', label: 'Prescription', icon: Pill },
                                { id: 'bill', label: 'Bill', icon: Receipt }
                            ].map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'details' && renderAppointmentDetails()}
                        {activeTab === 'prescription' && renderPrescription()}
                        {activeTab === 'bill' && renderBill()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleAppointment
