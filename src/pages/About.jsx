import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Plus,
    Stethoscope,
    Home as HomeIcon,
    Play,
    Users,
    Award,
    Heart,
    Shield,
    Clock,
    Star,
    ArrowRight,
    Phone,
    Mail,
    MapPin,
    CheckCircle,
    TrendingUp,
    UserCheck,
    Activity
} from 'lucide-react'
import { axiosinstance } from '../config/axios'

export const About = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        departments: 0,
        years: 0
    })
    const [doctors, setDoctors] = useState([])
    const [hasAnimated, setHasAnimated] = useState(false)








    // Animated counter effect on scroll
    useEffect(() => {
        const animateCounters = () => {
            if (hasAnimated) return

            const targetStats = { patients: 15000, doctors: 150, departments: 25, years: 15 }
            const duration = 3000
            const steps = 60
            const stepDuration = duration / steps

            let currentStep = 0
            const timer = setInterval(() => {
                currentStep++
                const progress = currentStep / steps
                const easeOut = 1 - Math.pow(1 - progress, 3)

                setStats({
                    patients: Math.floor(targetStats.patients * easeOut),
                    doctors: Math.floor(targetStats.doctors * easeOut),
                    departments: Math.floor(targetStats.departments * easeOut),
                    years: Math.floor(targetStats.years * easeOut)
                })

                if (currentStep >= steps) {
                    clearInterval(timer)
                    setStats(targetStats)
                    setHasAnimated(true)
                }
            }, stepDuration)
        }

        const handleScroll = () => {
            const statsSection = document.getElementById('stats-section')
            if (statsSection) {
                const rect = statsSection.getBoundingClientRect()
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0

                if (isVisible && !hasAnimated) {
                    animateCounters()
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        // Check on initial load in case section is already visible
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [hasAnimated])











    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axiosinstance.get('doctors/')
                setDoctors(response.data.data.slice(0, 4))
            } catch (error) {
                console.log(error)
            }
        }
        fetchDoctors()
    }, [])





    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/bg3.png"
                        alt="Hospital"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Plus className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">ABOUT CARELINK</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Your Health, Our Priority
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                        CareLink is dedicated to providing exceptional healthcare services with compassion,
                        innovation, and excellence at the heart of everything we do.
                    </p>
                </motion.div>
            </section>










            {/* Mission & Vision Section */}
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
                            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">OUR COMMITMENT</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Mission & Vision
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            We are committed to transforming healthcare through innovation, compassion, and excellence.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Stethoscope className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                To provide exceptional, patient-centered healthcare that improves lives and
                                strengthens communities through innovative medical practices and compassionate care.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Advanced medical technology</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">24/7 emergency services</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Compassionate patient care</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                                    <HomeIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                To be the leading healthcare provider, recognized for excellence in patient care,
                                medical innovation, and community health improvement.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">World-class medical facilities</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Expert medical professionals</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Community health leadership</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>








            {/* Values Section */}
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
                            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">OUR VALUES</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            What Drives Us
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Our core values guide every decision we make and every interaction we have with our patients.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: "Compassionate Care",
                                description: "We treat every patient with empathy, respect, and genuine concern for their wellbeing."
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: "Safety First",
                                description: "Patient safety is our top priority with rigorous protocols and quality standards."
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Team Excellence",
                                description: "Our multidisciplinary team works together to provide comprehensive, coordinated care."
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Quality Focus",
                                description: "We maintain the highest standards of medical excellence and continuous improvement."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>







            {/* Statistics Section */}
            <section id="stats-section" className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                            These numbers represent the trust and confidence our community has placed in us.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-white mb-2">{stats.patients.toLocaleString()}+</div>
                            <div className="text-blue-100 text-lg">Patients Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-white mb-2">{stats.doctors}+</div>
                            <div className="text-blue-100 text-lg">Expert Doctors</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-white mb-2">{stats.departments}+</div>
                            <div className="text-blue-100 text-lg">Departments</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-white mb-2">{stats.years}+</div>
                            <div className="text-blue-100 text-lg">Years of Service</div>
                        </motion.div>
                    </div>
                </div>
            </section>












            {/* Team Section */}
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
                            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">OUR TEAM</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Meet Our Expert Doctors
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Our team of experienced medical professionals is dedicated to providing the best care for our patients.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {doctors.map((doctor, index) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={doctor.profile_image || "/src/assets/hs1.jpg"}
                                        alt={doctor.first_name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.first_name} {doctor.last_name}</h3>
                                    <p className="text-blue-600 font-semibold mb-3">{doctor.specialization}</p>
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                        <span className="text-gray-600 text-sm ml-2">(4.9)</span>
                                    </div>
                                    <Link
                                        to={`/user/doctors/${doctor.id}`}
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                    >
                                        View Profile <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>





            {/* Video Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="h-64 rounded-2xl overflow-hidden">
                                <img
                                    src="/src/assets/bg3.png"
                                    alt="Healthcare facility"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="h-64 rounded-2xl overflow-hidden relative group cursor-pointer"
                                onClick={() => {
                                    const video = document.getElementById('about-video');
                                    if (video) {
                                        if (video.paused) {
                                            video.play();
                                            video.controls = true;
                                        }
                                    }
                                }}
                            >
                                <video
                                    id="about-video"
                                    className="w-full h-full object-cover"
                                    poster="/src/assets/hs4.png"
                                    preload="metadata"
                                    onPlay={() => setIsVideoPlaying(true)}
                                    onPause={() => setIsVideoPlaying(false)}
                                    onEnded={() => setIsVideoPlaying(false)}
                                >
                                    <source src="/src/assets/abv.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {!isVideoPlaying && (
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
                                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-gray-800 ml-1" />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    Experience CareLink
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Take a virtual tour of our state-of-the-art facilities and see how we're
                                    revolutionizing healthcare with cutting-edge technology and compassionate care.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { number: "98%", label: "Patient Satisfaction" },
                                    { number: "24/7", label: "Emergency Care" },
                                    { number: "50+", label: "Specialists" },
                                    { number: "15+", label: "Years Experience" }
                                ].map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className="bg-white p-6 rounded-xl shadow-lg"
                                    >
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                                        <div className="text-gray-600 font-semibold">{achievement.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link to={'/departments'}>
                                <motion.button
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 10 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Book Appointment
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>








            {/* Contact CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Experience Better Healthcare?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
                            Join thousands of satisfied patients who trust CareLink for their healthcare needs.
                            Book your appointment today and take the first step towards better health.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={'/departments'}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Book Appointment
                                </motion.button>
                            </Link>
                            <Link to={'/contact'}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
