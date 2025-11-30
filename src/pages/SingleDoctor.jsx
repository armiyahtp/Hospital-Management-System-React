import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosinstance } from '../config/axios'
import { Calendar as CalendarIcon, Mail, Phone, ChevronLeft, ChevronRight, Clock, User, Stethoscope, Award, DollarSign, FileText, Briefcase, CreditCard, CheckCircle, X } from 'lucide-react'
import PaymentModal from '../components/PaymentModal'

export const SingleDoctor = () => {
    const { id } = useParams()
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [tokens, setTokens] = useState([])
    const [tokensLoading, setTokensLoading] = useState(false)
    const [monthCursor, setMonthCursor] = useState(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    })
    const [mobileCalendarOpen, setMobileCalendarOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [countdown, setCountdown] = useState(5)

    const num = Number(id)
    const token = localStorage.getItem('Token')










    const formatLocalDate = (dateObj) => {
        const y = dateObj.getFullYear()
        const m = String(dateObj.getMonth() + 1).padStart(2, '0')
        const d = String(dateObj.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    const to12Hour = (time) => {
        if (!time) return ''
        const hhmm = String(time).slice(0, 5)
        const [hStr, mStr] = hhmm.split(':')
        let h = parseInt(hStr, 10)
        const ampm = h >= 12 ? 'PM' : 'AM'
        h = h % 12
        if (h === 0) h = 12
        return `${h}:${mStr} ${ampm}`
    }

    const isDateAvailable = (dateObj) => {
        if (!dateObj) return false
        const key = formatLocalDate(dateObj)
        return availableDates.has(key)
    }










    useEffect(() => {
        const fetchSingleDoctor = async () => {
            try {
                setLoading(true)
                const response = await axiosinstance.get(`doctor/${num}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setDoctor(response.data?.data || response.data)
                setError('')
            } catch (err) {
                setError('Failed to load doctor details')
            } finally {
                setLoading(false)
            }
        }
        fetchSingleDoctor()
    }, [])











    // Normalize available dates from API (support multiple shapes)
    const availableDates = useMemo(() => {
        if (!doctor) {
            return new Set()
        }
        const set = new Set()

        // Common shapes: doctor.available_dates (array of ISO), doctor.availability[].date, doctor.slots keys
        if (Array.isArray(doctor.available_dates)) {
            doctor.available_dates.forEach((d) => set.add(String(d).slice(0, 10)))
        }
        if (Array.isArray(doctor.availabilities)) {
            doctor.availabilities.forEach((a) => a?.date && set.add(String(a.date).slice(0, 10)))
        }

        return set
    }, [doctor])

    const monthLabel = useMemo(() => monthCursor.toLocaleString('default', { month: 'long', year: 'numeric' }), [monthCursor])

    const availableDatesList = useMemo(() => {
        return Array.from(availableDates).sort()
    }, [availableDates])

    const daysInMonth = useMemo(() => {
        const year = monthCursor.getFullYear()
        const month = monthCursor.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const days = []
        // Leading blanks for grid alignment
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null)
        }
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push(new Date(year, month, d))
        }
        return days
    }, [monthCursor])














    const handleDateClick = async (d) => {
        setSelectedDate(d);
        const formatted = formatLocalDate(d)
        try {
            setTokensLoading(true)
            setTokens([]) // Clear previous tokens

            const res = await axiosinstance.get(`doctor/${num}/?appointment_date=${formatted}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Handle different response structures
            const tokensData = res.data?.data?.tokens || []
            setTokens(tokensData);
        } catch (error) {
            console.log('Error fetching tokens:', error)
            setTokens([])
        } finally {
            setTokensLoading(false)
        }
    };

    const handleTokenSelect = (token) => {
        setSelectedToken(token)
        setShowPaymentModal(true)
    }

    const handlePaymentSuccess = (appointmentId) => {
        setPaymentSuccess(true)
        setCountdown(5)
        setShowPaymentModal(false)
        setSelectedToken(null)
        setSelectedDate(null)
        setTokens([])

        // Start countdown for auto-close
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval)
                    setPaymentSuccess(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

    }

    const handlePaymentClose = () => {
        setShowPaymentModal(false)
        setSelectedToken(null)
    }

    const handleSuccessClose = () => {
        setPaymentSuccess(false)
        setCountdown(5)
    }

    // Cleanup countdown interval on unmount
    useEffect(() => {
        return () => {
            // Clear any running intervals
            const intervals = []
            return () => intervals.forEach(clearInterval)
        }
    }, [])





    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="animate-pulse h-40 bg-gray-100 rounded-2xl" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
            </div>
        )
    }

    if (!doctor) return null

    return (
        <div className="bg-gray-50">
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
                                <Stethoscope className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Doctor Profile</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            View doctor details, availability, and book your appointment
                        </p>
                    </motion.div>
                </div>
            </div>









            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 py-5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid lg:grid-cols-3 gap-5 sm:gap-8"
                >
                    {/* Doctor Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            {/* Doctor Header */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-200 overflow-hidden">
                                    {doctor?.doctor.profile_image ? (
                                        <img src={doctor.doctor.profile_image} alt="Doctor" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{doctor?.doctor.first_name} {doctor?.doctor.last_name}</h1>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-3 text-sm mb-6">
                                {doctor?.doctor.email && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        <span className="truncate">{doctor.doctor.email}</span>
                                    </div>
                                )}
                                {doctor?.doctor.phone_number && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        <span>{doctor.doctor.phone_number}</span>
                                    </div>
                                )}
                                {Array.isArray(doctor?.available_dates) && doctor.available_dates.length > 0 && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CalendarIcon className="w-4 h-4 text-blue-600" />
                                        <span>Available on {doctor.available_dates.length} day(s)</span>
                                    </div>
                                )}
                            </div>

                            {/* Doctor Details */}
                            <div className="space-y-4">
                                {/* Experience */}
                                {doctor?.doctor.experience && (
                                    <div className="bg-blue-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Briefcase className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <h3 className="font-semibold text-gray-800">Experience</h3>
                                        </div>
                                        <p className="text-gray-700 text-sm ml-11">
                                            {doctor.doctor.experience} years of experience
                                        </p>
                                    </div>
                                )}

                                {/* Specialization */}
                                {doctor?.doctor.specialization && (
                                    <div className="bg-green-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Award className="w-4 h-4 text-green-600" />
                                            </div>
                                            <h3 className="font-semibold text-gray-800">Specialization</h3>
                                        </div>
                                        <p className="text-gray-700 text-sm ml-11">
                                            {doctor.doctor.specialization}
                                        </p>
                                    </div>
                                )}

                                {/* Consultation Fee */}
                                {doctor?.doctor.fee && (
                                    <div className="bg-purple-50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <DollarSign className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <h3 className="font-semibold text-gray-800">Consultation Fee</h3>
                                        </div>
                                        <p className="text-gray-700 text-sm ml-11">
                                            ₹{doctor.doctor.fee}
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                {doctor?.doctor.description && (
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <FileText className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-2">About Doctor</h3>
                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    {doctor.doctor.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>









                    {/* Availability & Tokens */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Availability</h2>
                                </div>
                                <div className="hidden lg:flex items-center gap-2">
                                    <button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))} className="p-2 rounded hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
                                    <span className="text-sm font-medium text-gray-700">{monthLabel}</span>
                                    <button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))} className="p-2 rounded hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>

                            {/* Mobile date pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="lg:hidden -mx-2 px-2"
                            >
                                <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                                    {availableDatesList.map((iso) => {
                                        const [yy, mm, dd] = iso.split('-').map(Number)
                                        const dObj = new Date(yy, mm - 1, dd)
                                        const isSelected = selectedDate && formatLocalDate(dObj) === formatLocalDate(selectedDate)
                                        const day = dObj.toLocaleDateString(undefined, { day: '2-digit' })
                                        const mon = dObj.toLocaleDateString(undefined, { month: 'short' })
                                        const wk = dObj.toLocaleDateString(undefined, { weekday: 'short' })
                                        return (
                                            <button
                                                key={iso}
                                                onClick={() => handleDateClick(dObj)}
                                                className={`min-w-[104px] rounded-2xl border px-3 py-2 text-center shadow-sm ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-300 text-gray-800'}`}
                                            >
                                                <div className="text-base sm:text-lg font-bold leading-5">{day} {mon}</div>
                                                <div className={`text-[10px] sm:text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>{wk}</div>
                                            </button>
                                        )
                                    })}
                                    <button onClick={() => setMobileCalendarOpen(!mobileCalendarOpen)} className="min-w-[104px] rounded-2xl border px-3 py-2 text-center shadow-sm bg-white border-blue-300 text-blue-700">Select Date</button>
                                </div>
                            </motion.div>










                            {/* Mobile calendar grid (toggle) */}
                            {mobileCalendarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="lg:hidden grid grid-cols-7 gap-2 select-none mt-3"
                                >
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                        <div key={d} className="text-xs text-gray-500 text-center py-1">{d}</div>
                                    ))}
                                    {daysInMonth.map((d, idx) => {
                                        if (!d) return <div key={`mb-${idx}`} />
                                        const isAvail = isDateAvailable(d)
                                        const isSelected = selectedDate && formatLocalDate(d) === formatLocalDate(selectedDate)
                                        return (
                                            <button
                                                key={`mb-${d.getTime()}`}
                                                onClick={() => { handleDateClick(d); setMobileCalendarOpen(false); }}
                                                className={`h-10 rounded-md text-sm font-medium transition-colors ${isAvail ? (isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100') : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                                disabled={!isAvail}
                                            >
                                                {d.getDate()}
                                            </button>
                                        )
                                    })}
                                </motion.div>
                            )}






                            {/* Desktop calendar grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                                className="hidden lg:grid grid-cols-7 gap-2 select-none"
                            >
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                    <div key={d} className="text-xs text-gray-500 text-center py-1">{d}</div>
                                ))}
                                {daysInMonth.map((d, idx) => {
                                    if (!d) return <div key={`b-${idx}`} />
                                    const isAvail = isDateAvailable(d)
                                    const isSelected = selectedDate && formatLocalDate(d) === formatLocalDate(selectedDate)
                                    return (
                                        <button
                                            key={d.getTime()}
                                            onClick={() => handleDateClick(d)}
                                            className={`h-10 rounded-md text-sm font-medium transition-colors ${isAvail ? (isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100') : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={!isAvail}
                                        >
                                            {d.getDate()}
                                        </button>
                                    )
                                })}
                            </motion.div>






                            {/* Tokens */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                className="mt-4 sm:mt-6"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Available tokens{selectedDate ? ` for ${formatLocalDate(selectedDate)}` : ''}</h3>
                                </div>

                                {tokensLoading ? (
                                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                                ) : tokens.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {tokens.map((t, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <Clock className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {t.token_number ? `Token #${t.token_number}` : 'Available Slot'}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {t.start_time ? `${to12Hour(t.start_time)}` : 'Time TBD'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-sm text-gray-600">
                                                        <p>Registration: ₹{Number(doctor?.doctor?.department?.hospital?.registration_fee || 0)}</p>
                                                        <p>Consultation: ₹{Number(doctor?.doctor?.fee || 0)}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-blue-600">
                                                            ₹{Number(doctor?.doctor?.department?.hospital?.registration_fee || 0) + Number(doctor?.doctor?.fee || 0)}
                                                        </p>
                                                        <p className="text-xs text-gray-500">Total</p>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleTokenSelect(t)}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                                                >
                                                    <CreditCard className="w-4 h-4" />
                                                    Book Now
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">{selectedDate ? 'No tokens available for the selected date.' : 'Select an available date to view tokens.'}</p>
                                )}
                                <p className="mt-3 text-center text-xs text-gray-500 lg:hidden">Swipe right to see more →</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={handlePaymentClose}
                token={selectedToken}
                doctor={doctor}
                onPaymentSuccess={handlePaymentSuccess}
            />

            {/* Payment Success Message */}
            {paymentSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-50 max-w-sm"
                >
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-semibold">Appointment Booked!</p>
                        <p className="text-sm text-green-100">Payment successful and appointment confirmed.</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-green-200">Auto-close in</span>
                            <span className="text-sm font-bold text-white">{countdown}s</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSuccessClose}
                        className="text-green-200 hover:text-white transition-colors p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </div>
    )
}
