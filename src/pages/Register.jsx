import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axios";
import toast from "react-hot-toast";
import { useSign } from "../context/SignContext";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Phone,
    Shield,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Loader2,
    UserPlus,
    Calendar,
    MapPin,
    Home,
    Users
} from "lucide-react";

const Register = () => {
    const navigate = useNavigate()
    const { isAuth } = useSign()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosinstance.post('register/', data)
            if (response?.data.status_code === 6000) {
                const token = response.data.access
                isAuth(token)
                toast.success(response.data.message)
                navigate('/')
            } else if (response?.data.status_code === 6001) {
                const errorData = response.data.error;
                const errorMessage = typeof errorData === "string" ? errorData : Object.values(errorData).flat().join(", ");
                toast.error(errorMessage);
            } else {
                toast.error('Register Failed')
            }
        } catch (error) {
            console.log(error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-500/25 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-cyan-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-indigo-400/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-rose-300/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
            </div>

            <div className="relative w-full max-w-4xl">
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-10 relative overflow-hidden"
                >
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-indigo-50/30"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-xl"></div>
                    {/* Header */}
                    <div className="text-center mb-12 relative z-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                            className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <UserPlus className="w-12 h-12 text-white relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/50 to-purple-400/50 animate-pulse"></div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3"
                        >
                            Create Account
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-600 text-lg font-medium"
                        >
                            Join MedAxis and start your healthcare journey
                        </motion.p>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"
                        ></motion.div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                        {/* Email and Phone Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-indigo-300 ${errors.email ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-indigo-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    Phone Number
                                </label>
                                <div className="relative group">
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        {...register("phone_number", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Enter a valid 10-digit phone number",
                                            },
                                        })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-blue-300 ${errors.phone_number ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    />
                                    <Phone className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.phone_number && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.phone_number.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* First Name and Last Name Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    First Name
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        {...register("first_name", { required: "First name is required" })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-emerald-300 ${errors.first_name ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-emerald-300'
                                            }`}
                                    />
                                    <User className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.first_name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.first_name.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    Last Name
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        {...register("last_name", { required: "Last name is required" })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-rose-300 ${errors.last_name ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-rose-300'
                                            }`}
                                    />
                                    <User className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-rose-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.last_name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.last_name.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Date of Birth and Gender Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    Date of Birth
                                </label>
                                <div className="relative group">
                                    <input
                                        type="date"
                                        {...register("date_of_birth", {
                                            required: "Date of birth is required",
                                            validate: (value) => {
                                                const today = new Date();
                                                const birthDate = new Date(value);
                                                const age = today.getFullYear() - birthDate.getFullYear();
                                                const monthDiff = today.getMonth() - birthDate.getMonth();

                                                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                                                    return age - 1 >= 0 || "Invalid date";
                                                }
                                                return age >= 0 || "Invalid date";
                                            }
                                        })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-orange-300 ${errors.date_of_birth ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-orange-300'
                                            }`}
                                    />
                                    <Calendar className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.date_of_birth && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.date_of_birth.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Users className="w-4 h-4 text-white" />
                                    </div>
                                    Gender
                                </label>
                                <div className="relative group">
                                    <select
                                        {...register("gender", { required: "Gender is required" })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-violet-300 ${errors.gender ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-violet-300'
                                            }`}
                                    >
                                        <option value="">Select your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <Users className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-violet-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.gender && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.gender.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Place and Address Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    Place (City)
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        {...register("place", { required: "Place is required" })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-teal-300 ${errors.place ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-teal-300'
                                            }`}
                                    />
                                    <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-teal-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.place && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.place.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Home className="w-4 h-4 text-white" />
                                    </div>
                                    Address
                                </label>
                                <div className="relative group">
                                    <textarea
                                        placeholder="Enter your full address"
                                        rows={1}
                                        {...register("address", { required: "Address is required" })}
                                        className={`w-full px-5 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-slate-500/30 focus:border-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-slate-300 resize-none ${errors.address ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-slate-300'
                                            }`}
                                    />
                                    <Home className="absolute left-5 top-5 w-5 h-5 text-gray-500 group-hover:text-slate-500 transition-colors duration-300" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.address && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.address.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Password and Confirm Password Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 4,
                                                message: "Password must be at least 4 characters"
                                            }
                                        })}
                                        className={`w-full px-5 py-4 pl-14 pr-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-red-300 ${errors.password ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-red-300'
                                            }`}
                                    />
                                    <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                                className="space-y-3 group"
                            >
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        {...register("confirm_password", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                        className={`w-full px-5 py-4 pl-14 pr-14 bg-white/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-yellow-300 ${errors.confirm_password ? 'border-red-400 bg-red-50/80 shadow-red-100' : 'border-gray-200 hover:border-yellow-300'
                                            }`}
                                    />
                                    <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors duration-300" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-500 transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {errors.confirm_password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="text-red-500 text-sm flex items-center gap-2 font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.confirm_password.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, type: "spring", stiffness: 100 }}
                            className="pt-4"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/50 to-purple-400/50 animate-pulse"></div>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                                        <span className="relative z-10 text-lg">Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10 text-lg">Create Account</span>
                                        <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
                        className="mt-12 text-center relative z-10"
                    >
                        <div className=" rounded-2xl p-6 border border-gray-200/50">
                            <p className="text-gray-700 text-lg font-medium mb-2">
                                Already have an account?
                            </p>
                            <Link
                                to={"/login"}
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-lg hover:underline transition-all duration-300 group"
                            >
                                <span>Sign In</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
                    className="mt-4 text-center"
                >
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600 rounded-2xl px-6 py-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Secure & Encrypted Registration</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
