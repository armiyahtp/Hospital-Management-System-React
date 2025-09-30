import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Edit,
    Trash2,
    Star,
    X,
    Save,
    AlertCircle,
    CheckCircle,
    User,
    MessageSquare
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingTestimonial, setEditingTestimonial] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [currentUserId, setCurrentUserId] = useState(null)

    // Form states
    const [formData, setFormData] = useState({
        service_name: '',
        rating: 5,
        description: ''
    })

    // Fetch current user and testimonials
    useEffect(() => {
        fetchCurrentUser()
        fetchTestimonials()
    }, [])







    const fetchCurrentUser = async () => {
        try {
            const response = await axiosinstance.get('user/me/')
            if (response.data.status_code === 6000) {
                setCurrentUserId(response.data.customer_id)
            }
        } catch (error) {
            console.error('Error fetching current user:', error)
            if (error.response?.status === 401) {
                showMessage('error', 'Please log in to access testimonials')
            }
        }
    }




    // Keep current user's testimonials at the top
    const sortedTestimonials = useMemo(() => {
        if (!Array.isArray(testimonials)) return []
        const testimonialsCopy = [...testimonials]
        return testimonialsCopy.sort((a, b) => {
            const aIsCurrent = currentUserId && a?.patient?.customer === currentUserId
            const bIsCurrent = currentUserId && b?.patient?.customer === currentUserId
            if (aIsCurrent === bIsCurrent) return 0
            return aIsCurrent ? -1 : 1
        })
    }, [testimonials, currentUserId])









    const fetchTestimonials = async () => {
        try {
            setLoading(true)
            const response = await axiosinstance.get('testimonials/')
            setTestimonials(response.data.data)
        } catch (error) {
            console.error('Error fetching testimonials:', error)
            showMessage('error', 'Failed to fetch testimonials')
        } finally {
            setLoading(false)
        }
    }





    const showMessage = (type, text) => {
        setMessage({ type, text })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }




    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }





    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }))
    }





    const resetForm = () => {
        setFormData({
            service_name: '',
            rating: 5,
            description: ''
        })
    }







    const handleAddTestimonial = async (e) => {
        e.preventDefault()

        if (!formData.service_name || !formData.description) {
            showMessage('error', 'Please fill in all required fields')
            return
        }

        try {
            setLoading(true)
            const response = await axiosinstance.post('testimonial/add/', formData)

            if (response.data.status_code === 6000) {
                showMessage('success', 'Testimonial added successfully!')
                setShowAddForm(false)
                resetForm()
                fetchTestimonials()
            }
        } catch (error) {
            console.error('Error adding testimonial:', error)
            if (error.response?.status === 401) {
                showMessage('error', 'Please log in to add testimonials')
            } else if (error.response?.status === 403) {
                showMessage('error', 'You do not have permission to add testimonials')
            } else {
                showMessage('error', 'Failed to add testimonial. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }









    const handleEditTestimonial = async (e) => {
        e.preventDefault()

        if (!formData.service_name || !formData.description) {
            showMessage('error', 'Please fill in all required fields')
            return
        }

        try {
            setLoading(true)
            const response = await axiosinstance.put(`testimonial/edit/${editingTestimonial.id}/`, formData)

            if (response.data.status_code === 6000) {
                showMessage('success', 'Testimonial updated successfully!')
                setShowEditModal(false)
                setEditingTestimonial(null)
                resetForm()
                fetchTestimonials()
            }
        } catch (error) {
            console.error('Error updating testimonial:', error)
            if (error.response?.status === 401) {
                showMessage('error', 'Please log in to edit testimonials')
            } else if (error.response?.status === 403) {
                showMessage('error', 'You can only edit your own testimonials')
            } else {
                showMessage('error', 'Failed to update testimonial. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }








    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) {
            return
        }

        try {
            setLoading(true)
            const response = await axiosinstance.delete(`testimonial/delete/${id}/`)

            if (response.data.status_code === 6000) {
                showMessage('success', 'Testimonial deleted successfully!')
                fetchTestimonials()
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error)
            if (error.response?.status === 401) {
                showMessage('error', 'Please log in to delete testimonials')
            } else if (error.response?.status === 403) {
                showMessage('error', 'You can only delete your own testimonials')
            } else {
                showMessage('error', 'Failed to delete testimonial. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }





    const openEditModal = (testimonial) => {
        setEditingTestimonial(testimonial)
        setFormData({
            service_name: testimonial.service_name || '',
            rating: testimonial.rating || 5,
            description: testimonial.description || ''
        })
        setShowEditModal(true)
    }





    const closeEditModal = () => {
        setShowEditModal(false)
        setEditingTestimonial(null)
        resetForm()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Testimonials</h1>
                        <p className="text-gray-600">View all testimonials and manage your own reviews</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Testimonial
                    </motion.button>
                </div>






                {/* Message */}
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                                }`}
                        >
                            {message.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>







                {/* Add Testimonial Form */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 bg-white rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Add New Testimonial</h2>
                            </div>

                            <form onSubmit={handleAddTestimonial} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Service Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="service_name"
                                        value={formData.service_name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Emergency Care, Cardiology Consultation"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating *
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingChange(star)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${star <= formData.rating
                                                    ? 'bg-yellow-400 text-white'
                                                    : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                                                    }`}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Share your experience with this service..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? 'Adding...' : 'Add Testimonial'}
                                    </motion.button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddForm(false)
                                            resetForm()
                                        }}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>






                {/* Testimonials List */}
                <div className="space-y-6">
                    {loading && testimonials.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading testimonials...</p>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Testimonials Yet</h3>
                            <p className="text-gray-500 mb-6">Share your experience by adding your first testimonial</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddForm(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Add Your First Testimonial
                            </motion.button>
                        </div>
                    ) : (
                        sortedTestimonials.map((testimonial, index) => {
                            const isCurrentUserTestimonial = currentUserId && testimonial.patient?.customer === currentUserId

                            return (
                                <motion.div
                                    key={testimonial?.id ?? `testimonial-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow ${isCurrentUserTestimonial ? 'ring-2 ring-blue-200' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCurrentUserTestimonial ? 'bg-blue-100' : 'bg-gray-100'
                                                }`}>
                                                <User className={`w-6 h-6 ${isCurrentUserTestimonial ? 'text-blue-600' : 'text-gray-600'
                                                    }`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-800 text-lg">
                                                        {testimonial.patient?.first_name} {testimonial.patient?.last_name}
                                                    </h3>
                                                    {isCurrentUserTestimonial && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                            Your Review
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-500 text-sm">{testimonial.service_name}</p>
                                            </div>
                                        </div>
                                        {isCurrentUserTestimonial && (
                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openEditModal(testimonial)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={`star-${testimonial?.id ?? 'na'}-${i}`}
                                                className={`w-5 h-5 ${i < testimonial.rating
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed italic">
                                        "{testimonial.description}"
                                    </p>
                                </motion.div>
                            )
                        })
                    )}
                </div>
            </div>






            {/* Edit Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Edit className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Edit Testimonial</h2>
                                </div>
                                <button
                                    onClick={closeEditModal}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEditTestimonial} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Service Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="service_name"
                                        value={formData.service_name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Emergency Care, Cardiology Consultation"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating *
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingChange(star)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${star <= formData.rating
                                                    ? 'bg-yellow-400 text-white'
                                                    : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                                                    }`}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Share your experience with this service..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? 'Updating...' : 'Update Testimonial'}
                                    </motion.button>
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default TestimonialManager


