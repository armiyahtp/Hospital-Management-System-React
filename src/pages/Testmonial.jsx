import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Star,
    Quote,
    Heart,
    Shield,
    Users,
    Award,
    Plus,
    ArrowRight,
    CheckCircle,
    TrendingUp,
    UserCheck,
    ThumbsUp,
    Clock,
    Eye,
    Settings
} from 'lucide-react'
import { axiosinstance } from '../config/axios'
import TestimonialManager from '../components/TestimonialManager'

export const Testmonial = () => {
    const [testimonials, setTestimonials] = useState([])
    const [activeTab, setActiveTab] = useState('view')


    
    
    const fetchTestimonials = async () => {
        try {
            const response = await axiosinstance.get('testimonials/')
            setTestimonials(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    // 'view' or 'manage'

    useEffect(() => {
        fetchTestimonials()
    }, [])


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Plus className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">PATIENT TESTIMONIALS</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Hear From Those Who Trust CareLink
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
                            Our patients' experiences speak volumes. Read how CareLink has provided compassionate,
                            expert care and made a difference in their lives.
                        </p>
                        <div className="flex items-center justify-center gap-4 text-blue-200">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-2 font-semibold">4.9/5 Rating</span>
                            </div>
                            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                            <span className="font-semibold">15,000+ Happy Patients</span>
                        </div>
                    </motion.div>
                </div>
            </section>










            {/* Tab Navigation */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-xl p-1 flex">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setActiveTab('view')
                                    fetchTestimonials()
                                }}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'view'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <Eye className="w-5 h-5" />
                                View Testimonials
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab('manage')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'manage'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <Settings className="w-5 h-5" />
                                Manage My Testimonials
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conditional Content */}
            {activeTab === 'manage' ? (
                <TestimonialManager />
            ) : (
                <>
                    {/* Testimonials Grid */}
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    What Our Patients Say
                                </h2>
                                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                    Real stories from real patients who have experienced the CareLink difference.
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {testimonial.patient?.first_name?.charAt(0) || 'P'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-lg">
                                                    {testimonial.patient?.first_name} {testimonial.patient?.last_name}
                                                </h3>
                                                <p className="text-gray-500 text-sm">{testimonial.patient?.place}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                                            <p className="text-gray-700 italic leading-relaxed pl-6">
                                                "{testimonial.description}"
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span>Verified Patient</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>











                    {/* Features Section */}
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-16"
                            >
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Plus className="w-4 h-4 text-blue-600" />
                                    <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">WHY PATIENTS CHOOSE US</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    What Makes CareLink Special
                                </h2>
                                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                    Our patients consistently highlight these key aspects of our care.
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    {
                                        icon: <Heart className="w-8 h-8" />,
                                        title: "Compassionate Care",
                                        description: "Our patients consistently praise our caring and empathetic approach to healthcare."
                                    },
                                    {
                                        icon: <Shield className="w-8 h-8" />,
                                        title: "Trusted Service",
                                        description: "Years of reliable healthcare service have built strong trust in our community."
                                    },
                                    {
                                        icon: <Award className="w-8 h-8" />,
                                        title: "Quality Excellence",
                                        description: "We maintain the highest standards of medical care and patient satisfaction."
                                    },
                                    {
                                        icon: <Users className="w-8 h-8" />,
                                        title: "Patient-Focused",
                                        description: "Every decision we make is centered around our patients' wellbeing and comfort."
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                                    >
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                            <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>











                    {/* Patient Journey Section */}
                    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-4xl font-bold text-white mb-6">
                                    Your Journey to Better Health
                                </h2>
                                <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                                    From the moment you walk through our doors, we're committed to providing you with exceptional care every step of the way.
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <UserCheck className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">1. Easy Booking</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Book your appointment online or call us directly. We make it simple to get the care you need when you need it.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Heart className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">2. Compassionate Care</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Our experienced medical team provides personalized, compassionate care tailored to your unique health needs.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <TrendingUp className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">3. Ongoing Support</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        We're here for your long-term health journey with follow-up care, health monitoring, and continuous support.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Why Patients Love Us Section */}
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-16"
                            >
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Plus className="w-4 h-4 text-blue-600" />
                                    <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">PATIENT EXPERIENCE</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    Why Patients Choose CareLink
                                </h2>
                                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                    Discover what makes our patients consistently rate us among the best healthcare providers.
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">24/7 Availability</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Round-the-clock emergency care and support when you need it most. Your health doesn't wait, and neither do we.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Advanced Technology</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        State-of-the-art medical equipment and cutting-edge technology for accurate diagnosis and effective treatment.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Expert Team</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Board-certified specialists and experienced healthcare professionals dedicated to your wellbeing.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                                            <Heart className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Personalized Care</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Tailored treatment plans that consider your unique health history, preferences, and lifestyle.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Quality Assurance</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Rigorous quality standards and continuous improvement to ensure the highest level of patient care.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                                            <ThumbsUp className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Patient Satisfaction</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Consistently high patient satisfaction scores and positive feedback from our community.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>










                    {/* Call to Action Section */}
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    Ready to Experience CareLink?
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
                                    Join thousands of satisfied patients who trust CareLink for their healthcare needs.
                                    Book your appointment today and become part of our success story.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to={'/departments'}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            Book Appointment <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                    <Link to={'/contact'}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            Contact Us <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}
