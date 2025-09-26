import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosinstance } from '../config/axios'
import { Calendar as CalendarIcon, Mail, Phone, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

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
        if (!doctor) return new Set()
        const set = new Set()
        // Common shapes: doctor.available_dates (array of ISO), doctor.availability[].date, doctor.slots keys
        if (Array.isArray(doctor.available_dates)) {
            doctor.available_dates.forEach((d) => set.add(String(d).slice(0, 10)))
        }
        if (Array.isArray(doctor.availability)) {
            doctor.availability.forEach((a) => a?.date && set.add(String(a.date).slice(0, 10)))
        }
        if (doctor.slots && typeof doctor.slots === 'object') {
            Object.keys(doctor.slots).forEach((k) => set.add(String(k).slice(0, 10)))
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
            const res = await axiosinstance.get(`doctor/${num}/?appointment_date=${formatted}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTokens(res.data.data.tokens);
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setTokensLoading(false)
        }
    };





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
            <div className='w-full bg-[#031e2dd0] h-12 sm:h-14 lg:h-16 mb-4 sm:mb-6'></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
                <div className="grid lg:grid-cols-3 gap-5 sm:gap-8">
                    {/* Doctor Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-200 overflow-hidden">
                                    {doctor?.doctor.profile_image ? (
                                        <img src={doctor.doctor.profile_image} alt="Doctor" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{doctor?.doctor.first_name} {doctor?.doctor.last_name}</h1>
                                    <p className="text-blue-600 font-medium text-sm sm:text-base truncate">{doctor?.doctor.department?.name || 'Department'}</p>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-sm">
                                {doctor?.doctor.email && (
                                    <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-blue-600" /> {doctor.doctor.email}</div>
                                )}
                                {doctor?.doctor.phone_number && (
                                    <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-blue-600" /> {doctor.doctor.phone_number}</div>
                                )}
                                {Array.isArray(doctor?.available_dates) && doctor.available_dates.length > 0 && (
                                    <div className="flex items-center gap-2 text-gray-700"><CalendarIcon className="w-4 h-4 text-blue-600" /> Available on {doctor.available_dates.length} day(s)</div>
                                )}
                            </div>
                        </div>
                    </div>







                    {/* Availability & Tokens */}
                    <div className="lg:col-span-2">
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
                            <div className="lg:hidden -mx-2 px-2">
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
                            </div>








                            {/* Mobile calendar grid (toggle) */}
                            {mobileCalendarOpen && (
                                <div className="lg:hidden grid grid-cols-7 gap-2 select-none mt-3">
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
                                </div>
                            )}

                            {/* Desktop calendar grid */}
                            <div className="hidden lg:grid grid-cols-7 gap-2 select-none">
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
                            </div>

                            {/* Tokens */}
                            <div className="mt-4 sm:mt-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Available tokens{selectedDate ? ` for ${formatLocalDate(selectedDate)}` : ''}</h3>
                                </div>
                                {tokensLoading ? (
                                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                                ) : tokens.length > 0 ? (
                                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                                        {tokens.map((t, i) => (
                                            <button key={i} className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 text-xs sm:text-sm font-medium">
                                                {t.token_number ? `#${t.token_number} ` : ''}{t.start_time ? `${to12Hour(t.start_time)}` : ''}{t.end_time ? ` - ${to12Hour(t.end_time)}` : ''}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">{selectedDate ? 'No tokens available for the selected date.' : 'Select an available date to view tokens.'}</p>
                                )}
                                <p className="mt-3 text-center text-xs text-gray-500 lg:hidden">Swipe right to see more →</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
