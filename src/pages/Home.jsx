import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import img1 from '../assets/hs1.jpg'
import img2 from '../assets/hs2.jpg'
import img3 from '../assets/hs3.png'
import img4 from '../assets/hs4.png'
import { Plus, User, Cross, Clock, Stethoscope, Home as HomeIcon, Play, Pill, Building, Shield, ArrowRight, Star, Quote, Phone } from 'lucide-react';
import { axiosinstance } from '../config/axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [active, setActive] = useState(0)
    const [department, setDepartment] = useState([])
    const [doctors, setDoctor] = useState([])
    const [testimonials, setTest] = useState([])
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)






    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axiosinstance.get('departments/')
                setDepartment(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDepartment()
    }, [])






    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axiosinstance.get('doctors/')
                setDoctor(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDoctor()
    }, [])







    useEffect(() => {
        const fetchTestimoniol = async () => {
            try {
                const response = await axiosinstance.get('testimonials/')
                setTest(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTestimoniol()
    }, [])


    return (
        <>
            <div>
                <section className="">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, EffectFade]}
                        effect="fade"
                        loop={true}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
                        speed={800}
                        onSlideChange={(sw) => setActive(sw.realIndex)}
                        className="h-[420px] sm:h-[520px] lg:h-[620px]"
                    >
                        <SwiperSlide>
                            <div className="relative h-full ">
                                <img src={img1} alt="slide 1" className='absolute inset-0 h-full w-full object-cover animate-kenburns' />
                                <div className="absolute inset-0 bg-[#00000089]" />
                                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                                    <motion.div key={active === 0 ? 'slide-0' : 'slide-0-idle'} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-white max-w-xl">
                                        <p className="text-xs uppercase flex items-center tracking-widest text-white/80"><Plus className='w-4 mr-1 text-orange-400 font-black' /> Care Link</p>
                                        <h2 className="mt-2 text-3xl sm:text-6xl font-extrabold">We are here to hear and heal your health problems</h2>
                                        <div className="mt-4 flex gap-3">
                                            <a className="px-6 py-3 rounded-full bg-brand-600 border-brand-600 text-white hover:bg-brand-700 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Get Started</a>
                                            <a className="px-7 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Learn More</a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <img src={img2} alt="slide 2" className='absolute inset-0 h-full w-full object-cover animate-kenburns' />
                                <div className="absolute inset-0 bg-[#00000089]" />
                                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
                                    <motion.div key={active === 1 ? 'slide-1' : 'slide-1-idle'} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-white max-w-xl ">
                                        <p className="text-xs uppercase flex items-center tracking-widest text-white/80"><Plus className='w-4 mr-1 text-orange-400 font-black' /> Emergency Ready</p>
                                        <h2 className="mt-2 text-3xl sm:text-6xl font-extrabold">24/7 emergency care and ambulance services</h2>
                                        <div className="mt-4 flex gap-3">
                                            <a className="px-6 py-3 rounded-full bg-brand-600 border-brand-600 text-white hover:bg-brand-700 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Call Now</a>
                                            <a className="px-8 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Details</a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <img src={img3} alt="slide 3" className='absolute inset-0 h-full w-full object-cover animate-kenburns' />
                                <div className="absolute inset-0 bg-[#00000089]" />
                                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                                    <motion.div key={active === 2 ? 'slide-2' : 'slide-2-idle'} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-white max-w-xl">
                                        <p className="text-xs uppercase flex items-center tracking-widest text-white/80"><Plus className='w-4 mr-1 text-orange-400 font-black' /> Specialists</p>
                                        <h2 className="mt-2 text-3xl sm:text-6xl font-extrabold">Consult our experienced medical specialists</h2>
                                        <div className="mt-4 flex gap-3">
                                            <a className="px-5 py-3 rounded-full bg-brand-600 border-brand-600 text-white hover:bg-brand-700 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Book Appointment</a>
                                            <a className="px-5 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">View Doctors</a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <img src={img4} alt="slide 4" className='absolute inset-0 h-full w-full object-cover animate-kenburns' />
                                <div className="absolute inset-0 bg-[#00000089]" />
                                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
                                    <motion.div key={active === 3 ? 'slide-3' : 'slide-3-idle'} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-white max-w-xl ">
                                        <p className="text-xs uppercase flex items-center tracking-widest text-white/80"><Plus className='w-4 mr-1 text-orange-400 font-black' /> Modern Facilities</p>
                                        <h2 className="mt-2 text-3xl sm:text-6xl font-extrabold">Well equipped labs and advanced diagnostics</h2>
                                        <div className="mt-4 flex gap-3">
                                            <a className="px-9 py-3 rounded-full bg-brand-600 border-brand-600 text-white hover:bg-brand-700 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Explore</a>
                                            <a className="px-9 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 text-sm drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]">Contact</a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>








                {/* Service Highlights Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8 items-stretch">
                            {/* Expert Doctors Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-6">
                                    <User className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Doctors</h3>
                                <p className="text-gray-600">Skilled professionals delivering top-quality care.</p>
                            </motion.div>

                            {/* Emergency Care Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                                    <Cross className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Emergency Care</h3>
                                <p className="text-blue-100">Fast, reliable treatment when you need it most.</p>
                            </motion.div>

                            {/* 24/7 Full Support Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-6">
                                    <Clock className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">24/7 Full Support</h3>
                                <p className="text-gray-600">Always here for appointments and emergencies.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>








                {/* About Us Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Images and Video */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="h-64 rounded-2xl overflow-hidden"
                                >
                                    <img
                                        src="/src/assets/bg3.png"
                                        alt="Healthcare facility"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
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
                            </div>

                            {/* Right Column - About Us Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Plus className="w-4 h-4 text-blue-600" />
                                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">ABOUT US</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                        CareLink Create A Safe, Your Health Our Priority
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        CareLink provides top-quality healthcare with experienced doctors, emergency services, and round-the-clock support. Your trusted partner for a healthier life.
                                    </p>
                                </div>

                                {/* Our Vision Cards */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="bg-gray-50 p-6 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Stethoscope className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-800">Our Vision</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            To be a trusted leader in quality, accessible, and compassionate healthcare.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="bg-gray-50 p-6 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <HomeIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-800">Our Vision</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            CareLink delivers expert, patient-focused care with 24/7, advanced technology, and a focus on wellness.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Call to Action Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Appointment
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </section>








                {/* Services Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Comprehensive Healthcare Solutions</h2>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                At MedAxis, we offer a wide range of medical services tailored to your needs, from routine check-ups to specialized treatments.
                            </p>
                        </div>



                        <div className="grid md:grid-cols-3 gap-8">
                            {
                                department.slice(0, 5).map((dep, index) => (
                                    <Link key={index} to={`/user/department/${dep?.id}`} className="block h-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="group bg-white hover:bg-blue-600 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-colors duration-300 h-full min-h-[220px] flex flex-col"
                                        >
                                            <div className="flex items-center justify-start mb-6 h-16">
                                                <img src={dep.logo} className='w-16 h-16 rounded-full shadow-md object-cover' alt="" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-5">{dep.name}</h3>
                                            <p className="text-gray-600 group-hover:text-blue-100">{dep.description}</p>
                                        </motion.div>
                                    </Link>
                                ))
                            }


                            {/* Emergency Call Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                                    <Phone className="w-8 h-8 text-gray-800" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Emergency Call</h3>
                                <p className="text-gray-300 mb-6">24/7 emergency medical assistance when you need it most.</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>






                {/* Doctors Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Specialist Doctors</h2>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                Our team of specialist doctors is dedicated to providing expert care across a wide range of medical fields.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {
                                doctors.map((doctor, index) => (
                                    <Link key={doctor.id || index} to={`/user/doctors/${doctor.id}`} className="block">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        >
                                            <div className="w-32 h-32 bg-gray-300 rounded-2xl mx-auto mb-4 overflow-hidden">
                                                <img src={doctor.profile_image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">{doctor.first_name} {doctor.last_name}</h3>
                                            <p className="text-gray-600">{doctor.department.name}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>





                {/* How It Works Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    Trusted Healthcare With A Focus On Your Well-Being
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    At CareLink, we've streamlined the healthcare process to ensure you receive the best care with ease and convenience.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {[
                                    { number: "01", title: "Book An Appointment", description: "Schedule your visit with our specialist doctors at your convenience." },
                                    { number: "02", title: "Consult Our Experts", description: "Meet with experienced healthcare professionals for personalized care." },
                                    { number: "03", title: "Receive Care", description: "Get the treatment and support you need for optimal health." },
                                    { number: "04", title: "Follow-Up", description: "Continuous monitoring and care to ensure your recovery and wellness." }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-xl shadow-lg"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                {step.number}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                                                <p className="text-gray-600 text-sm">{step.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>








                {/* Testimonials Section */}
                <section className="py-16 bg-blue-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">Hear From Those Who Trust Care Link</h2>
                            <p className="text-blue-200 text-lg max-w-3xl mx-auto">
                                Our patients' experiences speak volumes. Read how CareLink has provided compassionate, expert care and made a difference in their lives.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {
                                testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-blue-800 p-8 rounded-2xl"
                                    >
                                        <div className="w-16 h-16 bg-gray-400 rounded-xl mb-6"></div>
                                        <h3 className="text-white font-bold mb-1">{testimonial.patient.first_name} {testimonial.patient.last_name}</h3>
                                        <p className="text-blue-200 text-sm mb-4">{testimonial.patient.place}</p>
                                        <p className="text-blue-100 mb-6 italic">"{testimonial.description}"</p>
                                        <div className="flex gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Home
