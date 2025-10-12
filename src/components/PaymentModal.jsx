import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import PaymentModalContent from "./PaymentModalContent";
import { axiosinstance } from "../config/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = ({ isOpen, token, doctor, onPaymentSuccess, onClose }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [paymentId, setPaymentId] = useState("");
    const [loadingError, setLoadingError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && token?.id) {
            setIsReady(false);
            setLoadingError("");
            createPaymentIntent();
        }
    }, [isOpen, token]);

    const createPaymentIntent = async () => {
        setIsLoading(true);
        try {
            const response = await axiosinstance.post(
                `appointment/payment/${token.id}/`,
                {
                    payment_method_types: ["card"],
                }
            );
            if (response.data.error){
                setLoadingError(response.data.error)
            } else if (response.data.clientSecret) {
                if (response.data.clientSecret.includes('_secret_')) {
                    setClientSecret(response.data.clientSecret);
                    setPaymentId(response.data.payment_id);
                    setIsReady(true);
                    setLoadingError("");
                } else {
                    console.error("Invalid client secret format:", response.data.clientSecret);
                    setLoadingError("Invalid payment configuration received");
                    setIsReady(true);
                }
            } else {
                console.error("No client secret in response:", response.data);
                setLoadingError("Unable to initialize payment system");
                setIsReady(true);
            }
        } catch (err) {
            console.error("Failed to create payment intent:", err);
            setLoadingError(err.response?.data?.error || err.message || "Payment system unavailable");
            setIsReady(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        setLoadingError("");
        setIsReady(false);
        createPaymentIntent();
    };

    if (!isOpen) return null;

    if (!isReady) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Secure Payment</h3>
                                    <p className="text-blue-100 text-sm">Initializing secure gateway...</p>
                                </div>
                            </div>
                        </div>

                        {/* Loading Content */}
                        <div className="p-8 text-center">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 border-4 border-blue-100 rounded-full mx-auto"></div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>

                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                {isLoading ? "Setting up payment..." : "Preparing secure checkout"}
                            </h4>
                            <p className="text-gray-600 mb-6">
                                {isLoading ? "Connecting to payment processor..." : "Please wait while we prepare your payment options"}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "70%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4" />
                                <span>256-bit SSL encryption</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    if (!clientSecret) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        {/* Error Header */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Payment Error</h3>
                                    <p className="text-red-100 text-sm">Unable to initialize payment</p>
                                </div>
                            </div>
                        </div>

                        {/* Error Content */}
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>

                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Setup Failed</h4>
                            <p className="text-gray-600 mb-6">{loadingError}</p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleRetry}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Try Again
                                </button>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#3b82f6',
                        colorBackground: '#ffffff',
                        colorText: '#1f2937',
                        colorDanger: '#ef4444',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '12px',
                    },
                }
            }}
        >
            <PaymentModalContent
                token={token}
                doctor={doctor}
                paymentId={paymentId}
                onPaymentSuccess={onPaymentSuccess}
                onClose={onClose}
            />
        </Elements>
    );
};

export default PaymentModal;
