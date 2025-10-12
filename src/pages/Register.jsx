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
    UserPlus
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                        >
                            <UserPlus className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600">Join CareLink and start your healthcare journey</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email and Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-indigo-500" />
                                    Email Address
                                </label>
                                <div className="relative">
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
                                        className={`w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-indigo-500" />
                                    Phone Number
                                </label>
                                <div className="relative">
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
                                        className={`w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.phone_number ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.phone_number && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.phone_number.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* First Name and Last Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    First Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        {...register("first_name", { required: "First name is required" })}
                                        className={`w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.first_name ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.first_name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.first_name.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    Last Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        {...register("last_name", { required: "Last name is required" })}
                                        className={`w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.last_name ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.last_name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.last_name.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Password and Confirm Password Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-indigo-500" />
                                    Password
                                </label>
                                <div className="relative">
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
                                        className={`w-full px-4 py-3 pl-12 pr-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.password ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-indigo-500" />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        {...register("confirm_password", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                        className={`w-full px-4 py-3 pl-12 pr-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${errors.confirm_password ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    />
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirm_password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm flex items-center gap-1"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.confirm_password.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure & Encrypted Registration</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
