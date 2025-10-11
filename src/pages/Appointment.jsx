import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Calendar,
    Clock,
    User,
    Stethoscope,
    MapPin,
    ChevronRight,
    CalendarDays,
    Clock3,
    History,
    FileText,
    Receipt,
    Pill,
    CheckCircle,
    AlertCircle,
    XCircle,
    Loader2,
    Ticket,
    Plus,
    Building,
    Phone,
    Mail,
    Award,
    Star,
    TrendingUp,
    Activity
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

const Appointment = () => {
    const [activeTab, setActiveTab] = useState('today')
    const [todayAppointments, setTodayAppointments] = useState([])
    const [latestAppointments, setLatestAppointments] = useState([])
    const [previousAppointments, setPreviousAppointments] = useState([])
    const [loading, setLoading] = useState({
        today: false,
        latest: false,
        previous: false
    })

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
                return <Clock3 className="w-4 h-4" />
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'cancelled':
                return <XCircle className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }







    const fetchTodayAppointments = async () => {
        try {
            setLoading(prev => ({ ...prev, today: true }))
            const response = await axiosinstance.get('appointments/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTodayAppointments(response.data.all_appointments || [])
        } catch (error) {
            console.error('Error fetching today appointments:', error)
            setTodayAppointments([])
        } finally {
            setLoading(prev => ({ ...prev, today: false }))
        }
    }









    const fetchLatestAppointments = async () => {
        try {
            setLoading(prev => ({ ...prev, latest: true }))
            const response = await axiosinstance.get('appointments/latest', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setLatestAppointments(response.data.latest_appointment || [])
        } catch (error) {
            console.error('Error fetching latest appointments:', error)
            setLatestAppointments([])
        } finally {
            setLoading(prev => ({ ...prev, latest: false }))
        }
    }








    const fetchPreviousAppointments = async () => {
        try {
            setLoading(prev => ({ ...prev, previous: true }))
            const response = await axiosinstance.get('appointments/pre', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPreviousAppointments(response.data.pre_appointment || [])
        } catch (error) {
            console.error('Error fetching previous appointments:', error)
            setPreviousAppointments([])
        } finally {
            setLoading(prev => ({ ...prev, previous: false }))
        }
    }







    useEffect(() => {
        if (token) {
            fetchTodayAppointments()
        }
    }, [token])







    const handleTabChange = (tab) => {
        setActiveTab(tab)
        if (tab === 'latest' && latestAppointments.length === 0) {
            fetchLatestAppointments()
        } else if (tab === 'previous' && previousAppointments.length === 0) {
            fetchPreviousAppointments()
        }
    }









    const renderAppointmentCard = (appointment) => (
        <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Stethoscope className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                            </h3>
                            <p className="text-lg text-blue-600 font-semibold">{appointment.doctor?.department?.name}</p>
                            <p className="text-sm text-gray-500">{appointment.doctor?.specialization}</p>
                        </div>
                    </div>
                    <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border-2 backdrop-blur-sm flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        {appointment.status?.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Appointment Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Ticket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Token Number</p>
                                <p className="text-lg font-bold text-gray-900">{appointment.token_number}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Appointment Date</p>
                                <p className="text-lg font-bold text-gray-900">{formatDate(appointment.appointment_date)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Time Slot</p>
                                <p className="text-lg font-bold text-gray-900">
                                    {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <Building className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Hospital</p>
                                <p className="text-lg font-bold text-gray-900">{appointment.doctor?.department?.hospital?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">Doctor Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-blue-500" />
                                    <span className="text-gray-600">{appointment.doctor?.experience || '10+'} years experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-gray-600">Specialized in {appointment.doctor?.department?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-3">
                        <Link
                            to={`/user/appointment/${appointment.id}`}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <FileText className="w-4 h-4" />
                            View Details
                        </Link>
                        {appointment.status === 'completed' && (
                            <>
                                <Link
                                    to={`/user/appointment/${appointment.id}?tab=prescription`}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Pill className="w-4 h-4" />
                                    Prescription
                                </Link>
                                <Link
                                    to={`/user/appointment/${appointment.id}?tab=bill`}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Receipt className="w-4 h-4" />
                                    Bill
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-200">
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                </div>
            </div>
        </motion.div>
    )




    const renderEmptyState = (type) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
        >
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="w-16 h-16 text-gray-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No {type} appointments found
            </h3>
            <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                {type === 'today' && "You don't have any appointments scheduled for today. Book an appointment to get started!"}
                {type === 'latest' && "You don't have any upcoming appointments. Schedule your next visit with our expert doctors."}
                {type === 'previous' && "You don't have any previous appointments. Your appointment history will appear here after your first visit."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                    to="/departments"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                    Book New Appointment
                </Link>
                <Link
                    to="/doctors"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                >
                    <User className="w-5 h-5" />
                    Browse Doctors
                </Link>
            </div>
        </motion.div>
    )





    const renderLoadingState = () => (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Appointments</h3>
            <p className="text-gray-500">Please wait while we fetch your appointment details...</p>
        </div>
    )






    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>

                <div className="relative py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 mr-4">
                                    <Calendar className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-white">My Appointments</h1>
                            </div>
                            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                                Manage and track all your medical appointments with ease and confidence
                            </p>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center justify-center mb-3">
                                        <CalendarDays className="w-8 h-8 text-white mr-3" />
                                        <span className="text-3xl font-bold text-white">{todayAppointments.length}</span>
                                    </div>
                                    <p className="text-blue-100 font-medium">Today's Appointments</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center justify-center mb-3">
                                        <Clock3 className="w-8 h-8 text-white mr-3" />
                                        <span className="text-3xl font-bold text-white">{latestAppointments.length}</span>
                                    </div>
                                    <p className="text-blue-100 font-medium">Upcoming Appointments</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center justify-center mb-3">
                                        <History className="w-8 h-8 text-white mr-3" />
                                        <span className="text-3xl font-bold text-white">{previousAppointments.length}</span>
                                    </div>
                                    <p className="text-blue-100 font-medium">Previous Appointments</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>



            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Enhanced Tab Navigation */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <nav className="flex">
                            {[
                                { id: 'today', label: 'Today', icon: CalendarDays, count: todayAppointments.length, color: 'blue' },
                                { id: 'latest', label: 'Upcoming', icon: Clock3, count: latestAppointments.length, color: 'green' },
                                { id: 'previous', label: 'History', icon: History, count: previousAppointments.length, color: 'purple' }
                            ].map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`flex-1 px-8 py-6 text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${activeTab === tab.id
                                            ? `bg-white text-${tab.color}-600 border-b-3 border-${tab.color}-600 shadow-lg`
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === tab.id
                                            ? `bg-${tab.color}-100`
                                            : 'bg-gray-100'
                                            }`}>
                                            <Icon className={`w-5 h-5 ${activeTab === tab.id
                                                ? `text-${tab.color}-600`
                                                : 'text-gray-500'
                                                }`} />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold">{tab.label}</div>
                                            {tab.count > 0 && (
                                                <span className={`text-xs px-2 py-1 rounded-full ${activeTab === tab.id
                                                    ? `bg-${tab.color}-100 text-${tab.color}-700`
                                                    : 'bg-gray-200 text-gray-600'
                                                    }`}>
                                                    {tab.count} appointment{tab.count !== 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </nav>
                    </div>




                    {/* Tab Content */}
                    <div className="p-8">
                        {loading[activeTab] ? (
                            renderLoadingState()
                        ) : (
                            <div className="space-y-8">
                                {activeTab === 'today' && (
                                    <>
                                        {todayAppointments.length > 0 ? (
                                            <div className="grid gap-8">
                                                {todayAppointments.map(renderAppointmentCard)}
                                            </div>
                                        ) : (
                                            renderEmptyState('today')
                                        )}
                                    </>
                                )}

                                {activeTab === 'latest' && (
                                    <>
                                        {latestAppointments.length > 0 ? (
                                            <div className="grid gap-8">
                                                {latestAppointments.map(renderAppointmentCard)}
                                            </div>
                                        ) : (
                                            renderEmptyState('latest')
                                        )}
                                    </>
                                )}

                                {activeTab === 'previous' && (
                                    <>
                                        {previousAppointments.length > 0 ? (
                                            <div className="grid gap-8">
                                                {previousAppointments.map(renderAppointmentCard)}
                                            </div>
                                        ) : (
                                            renderEmptyState('previous')
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Enhanced Quick Actions */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Quick Actions</h3>
                        <p className="text-indigo-100">Manage your healthcare journey with ease</p>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                to="/departments"
                                className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-blue-200"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Plus className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Book Appointment</h4>
                                    <p className="text-gray-600 leading-relaxed">Schedule a new appointment with our expert doctors</p>
                                </div>
                            </Link>

                            <Link
                                to="/doctors"
                                className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-green-200"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <User className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Find Doctors</h4>
                                    <p className="text-gray-600 leading-relaxed">Browse and connect with our qualified medical professionals</p>
                                </div>
                            </Link>

                            <Link
                                to="/departments"
                                className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-200"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Building className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Departments</h4>
                                    <p className="text-gray-600 leading-relaxed">Explore our specialized medical departments and services</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Appointment
