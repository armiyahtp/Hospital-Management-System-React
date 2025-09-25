import React from 'react'
import { Phone, Mail, Headphones, MapPin, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react'
import flogo from '../assets/hlogo.png'

export const Footer = () => {
    return (
        <footer className="bg-[#031e2d] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="grid lg:grid-cols-3 gap-12 mb-12">
                    
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={flogo} alt="MedAxis Hospital" className="h-24 w-24 object-contain" /> 
                            <span className="text-2xl font-bold">MedAxis</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 leading-tight">
                            Your Health, Our Priority<br />
                            Anytime, Anywhere
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Reach out to us for all your healthcare needs.
                        </p>
                    </div>

                    
                    <div>
                        <h3 className="text-orange-400 text-lg font-semibold mb-4 border-b border-orange-400 pb-2">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Our Mission & Vision</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Legal Notice</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Global Network</a></li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-orange-400 text-lg font-semibold mb-4 border-b border-orange-400 pb-2">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Medical Specialties</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Health Checkups</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Health Consultation</a></li>
                            <li><a href="#" className="text-white hover:text-orange-400 transition-colors">Emergency Services</a></li>
                        </ul>
                    </div>
                </div>

                
                <div className="flex flex-wrap gap-4 mb-8">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                        Contact Us
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <Mail className="w-4 h-4" />
                        Email Us
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <Headphones className="w-4 h-4" />
                        (310) 123-44567
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <MapPin className="w-4 h-4" />
                        Location on map
                    </button>
                </div>

                
                <div className="border-t border-white/20 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>

                        
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">Terms & Condition</a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors">Do not share or sell my information</a>
                        </div>

                        
                        <div className="text-sm text-white">
                            2025 © MedAxis. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
