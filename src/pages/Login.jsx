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
    Shield,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate()
    const { isAuth } = useSign()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await axiosinstance.post('login/', data)
            if (response?.data.status_code === 6000) {
                const token = response.data.data.access
                isAuth(token)
                toast.success(response.data.message)
                navigate('/')
            } else if (response?.data.status_code === 6001) {
                toast.error(response.data.error)
            } else {
                toast.error('Login Failed')
            }
        } catch (error) {
            console.log(error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative w-full max-w-md">
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
                            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                        >
                            <Shield className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">Sign in to your CareLink account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500" />
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
                                    className={`w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-blue-300'
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

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-blue-500" />
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
                                    className={`w-full px-4 py-3 pl-12 pr-12 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${errors.password ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-blue-300'
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

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to={'/register'}
                                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                            >
                                Create Account
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure & Encrypted</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
