import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Save,
    X,
    Camera,
    Shield,
    CheckCircle,
    AlertCircle,
    Loader2,
    Star,
    Award,
    Heart,
    Settings,
    UserCheck,
    Clock,
    Globe
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        dob: '',
        gender: '',
        place: '',
        address: ''
    })
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const token = localStorage.getItem('Token')

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosinstance.get('profile/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('Profile response:', response.data)
            if (response.data.status_code === 6000) {
                setProfile(response.data.data)
                setFormData({
                    first_name: response.data.data.first_name || '',
                    last_name: response.data.data.last_name || '',
                    email: response.data.data.email || '',
                    phone_number: response.data.data.phone_number || '',
                    dob: response.data.data.dob || '',
                    gender: response.data.data.gender || '',
                    place: response.data.data.place || '',
                    address: response.data.data.address || ''
                })
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
            setError('Failed to load profile data')
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async () => {
        try {
            setSaving(true)
            setError(null)
            setSuccess(null)

            const formDataToSend = new FormData()

            // Add text fields
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    formDataToSend.append(key, formData[key])
                }
            })

            // Add image if selected
            if (selectedImage) {
                formDataToSend.append('profile_image', selectedImage)
                console.log('Adding image to FormData:', selectedImage.name, selectedImage.size)
            }

            console.log('FormData contents:')
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value)
            }

            const response = await axiosinstance.put('update-profile/', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Update response:', response.data)

            if (response.data.status_code === 6000) {
                setProfile(response.data.data)
                setSuccess('Profile updated successfully!')
                setIsEditing(false)
                setSelectedImage(null)
                setImagePreview(null)
                // Dispatch event to update header profile image
                window.dispatchEvent(new CustomEvent('profileImageUpdated'))
                setTimeout(() => setSuccess(null), 3000)
            } else {
                setError('Failed to update profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            setError('Failed to update profile. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    // Separate function to update only the profile image
    const updateProfileImage = async () => {
        if (!selectedImage) return

        try {
            setSaving(true)
            setError(null)
            setSuccess(null)

            const formDataToSend = new FormData()
            formDataToSend.append('profile_image', selectedImage)

            console.log('Updating profile image only:', selectedImage.name)

            const response = await axiosinstance.put('update-profile/', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Image update response:', response.data)

            if (response.data.status_code === 6000) {
                setProfile(response.data.data)
                setSuccess('Profile image updated successfully!')
                setSelectedImage(null)
                setImagePreview(null)
                // Dispatch event to update header profile image
                window.dispatchEvent(new CustomEvent('profileImageUpdated'))
                setTimeout(() => setSuccess(null), 3000)
            } else {
                setError('Failed to update profile image')
            }
        } catch (error) {
            console.error('Error updating profile image:', error)
            setError('Failed to update profile image. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file')
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB')
                return
            }

            setSelectedImage(file)

            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)

            // Auto-update image immediately
            setTimeout(() => {
                updateProfileImage()
            }, 100)
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        setError(null)
        setSuccess(null)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setError(null)
        setSuccess(null)
        setSelectedImage(null)
        setImagePreview(null)
        // Reset form data to original profile data
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                email: profile.email || '',
                phone_number: profile.phone_number || '',
                dob: profile.dob || '',
                gender: profile.gender || '',
                place: profile.place || '',
                address: profile.address || ''
            })
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    useEffect(() => {
        if (token) {
            fetchProfile()
        }
    }, [token])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Profile</h3>
                    <p className="text-gray-500">Please wait while we fetch your profile details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Enhanced Hero Header */}
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
                            <div className="flex items-center justify-center mb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 mr-6 shadow-2xl">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                                        My Profile
                                    </h1>
                                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                                Manage your personal information and healthcare preferences
                            </p>

                            {/* Floating Elements */}
                            <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute top-32 right-32 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                            <div className="absolute bottom-20 left-32 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-500"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Profile Header Card */}
                    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-100">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Enhanced Profile Image */}
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative w-32 h-32 bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
                                    {profile?.profile_image ? (
                                        <img
                                            src={profile.profile_image}
                                            alt="Profile"
                                            className="w-full h-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group-hover:scale-110">
                                    <Camera className="w-6 h-6 text-blue-600" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>

                                {/* Status Indicator */}
                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                            </div>

                            {/* Enhanced Profile Info */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="mb-6">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                                        {profile?.first_name} {profile?.last_name}
                                    </h2>
                                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            {profile?.email || 'Email not provided'}
                                        </div>
                                        <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg">
                                            <Shield className="w-4 h-4 inline mr-2" />
                                            Verified Account
                                        </div>
                                    </div>
                                </div>

                                {selectedImage && (
                                    <div className="mb-6">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-sm font-semibold shadow-lg">
                                            <CheckCircle className="w-4 h-4" />
                                            New image selected
                                        </span>
                                        <button
                                            onClick={updateProfileImage}
                                            disabled={saving}
                                            className="ml-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg"
                                        >
                                            {saving ? 'Uploading...' : 'Update Image'}
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Phone</h3>
                                                <p className="text-lg font-bold text-gray-900">{profile?.phone_number || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Location</h3>
                                                <p className="text-lg font-bold text-gray-900">{profile?.place || 'Location not specified'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Birth Date</h3>
                                                <p className="text-lg font-bold text-gray-900">{formatDate(profile?.dob)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Action Buttons */}
                            <div className="flex flex-col lg:flex-row gap-4">
                                {!isEditing ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleEdit}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
                                    >
                                        <Edit3 className="w-6 h-6" />
                                        Edit Profile
                                    </motion.button>
                                ) : (
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={updateProfile}
                                            disabled={saving}
                                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl disabled:opacity-50"
                                        >
                                            {saving ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-6 h-6" />
                                                    Save Changes
                                                </>
                                            )}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCancel}
                                            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold text-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
                                        >
                                            <X className="w-6 h-6" />
                                            Cancel
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Success/Error Messages */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border-l-4 border-green-400 p-4 mx-8 mt-6"
                        >
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                                <p className="text-green-700 font-medium">{success}</p>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border-l-4 border-red-400 p-4 mx-8 mt-6"
                        >
                            <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Enhanced Profile Details */}
                    <div className="p-8 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Personal Information
                                        </h3>
                                        <p className="text-gray-600 text-sm">Manage your basic details</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">First Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                                />
                                            ) : (
                                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm">
                                                    {profile?.first_name || 'Not provided'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Last Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                                />
                                            ) : (
                                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm">
                                                    {profile?.last_name || 'Not provided'}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-blue-500" />
                                                {profile?.email || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-blue-500" />
                                                {profile?.phone_number || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date of Birth</label>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                                />
                                            ) : (
                                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-blue-500" />
                                                    {formatDate(profile?.dob)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender</label>
                                            {isEditing ? (
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            ) : (
                                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm flex items-center gap-3">
                                                    <User className="w-5 h-5 text-blue-500" />
                                                    {profile?.gender || 'Not specified'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Location Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Location Information
                                        </h3>
                                        <p className="text-gray-600 text-sm">Manage your address details</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Place</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="place"
                                                value={formData.place}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-green-500" />
                                                {profile?.place || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Address</label>
                                        {isEditing ? (
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl text-gray-900 font-semibold border-2 border-transparent shadow-sm min-h-[100px] flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                                <span className="whitespace-pre-wrap">{profile?.address || 'Not provided'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
