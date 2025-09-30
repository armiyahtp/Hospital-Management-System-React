import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CreditCard,
    CheckCircle,
    AlertCircle,
    Loader2,
    Shield,
    Clock,
    User,
    Stethoscope
} from "lucide-react";
import { axiosinstance } from "../config/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);





const PaymentModalContent = ({ isOpen, onClose, token, doctor, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const registrationFee = Number(doctor?.doctor?.department?.hospital?.registration_fee || 0);
    const doctorFee = Number(doctor?.doctor?.fee || 0);
    const totalAmount = registrationFee + doctorFee;

    const formatTime = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    useEffect(() => {
        if (isOpen && token && token.id) {
            createPaymentIntent();
        } else if (isOpen && !token) {
            setError("No appointment token provided");
        }
    }, [isOpen, token]);

    const createPaymentIntent = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axiosinstance.post(`appointment/payment/${token.id}/`);
            if (response.data.clientSecret) {
                setClientSecret(response.data.clientSecret);
                setPaymentId(response.data.payment_id);
            } else {
                setError("Failed to create payment intent. No client secret received.");
            }
        } catch (err) {
            setError(`Failed to create payment intent: ${err.response?.data?.error || err.message}`);
        } finally {
            setLoading(false);
        }
    };











    const handlePayment = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);
        setError("");

        if (!stripe || !elements) {
            setError("Stripe.js has not loaded yet.");
            setPaymentLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card Element not found.");
            setPaymentLoading(false);
            return;
        }

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: "Test User",
                    },
                },
            });

            if (stripeError) {
                console.log("Stripe payment error:", stripeError);
                setError(stripeError.message);
                setPaymentLoading(false);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                const response = await axiosinstance.post(
                    `appointment/confirm/${token?.id}/`,
                    {
                        payment_id: paymentId,
                        payment_intent_id: paymentIntent.id,
                    }
                );

                if (response.data.status_code === 6000) {
                    setSuccess(true);
                    setTimeout(() => {
                        onPaymentSuccess(response.data.appointment_id);
                        onClose();
                    }, 2000);
                } else {
                    setError(response.data.error || "Appointment confirmation failed.");
                }
            } else {
                setError("Payment not completed");
            }
        } catch (err) {
            console.log("Payment error:", err);
            setError(err.response?.data?.error || err.message || "Payment failed");
        } finally {
            setPaymentLoading(false);
        }
    };



    if (!isOpen) return null;

    return (
        <AnimatePresence>
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
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-3xl text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Complete Payment</h2>
                                    <p className="text-blue-100">Secure payment (Test Mode)</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                                <p className="text-gray-600 mb-6">Your appointment has been confirmed.</p>
                            </motion.div>
                        ) : (
                            <>
                                {/* Appointment Summary */}
                                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Stethoscope className="w-5 h-5 text-blue-600" />
                                        Appointment Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    Dr. {doctor?.doctor?.first_name} {doctor?.doctor?.last_name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {doctor?.doctor?.department?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium text-gray-800">{token?.appointment_date}</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatTime(token?.start_time)} - {formatTime(token?.end_time)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Summary */}
                                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Registration Fee</span>
                                            <span className="font-medium">₹{registrationFee}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Consultation Fee</span>
                                            <span className="font-medium">₹{doctorFee}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total Amount</span>
                                                <span className="text-blue-600">₹{totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-600">Preparing payment...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handlePayment} className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Card Details
                                            </label>
                                            <div className="w-full border rounded-xl p-4 focus-within:ring-2 focus-within:ring-blue-500 border-gray-300">
                                                <CardElement />
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">
                                                Use test card 4242 4242 4242 4242, any future date, any CVV.
                                            </p>
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                                            >
                                                <AlertCircle className="w-5 h-5 text-red-600" />
                                                <p className="text-red-800 text-sm">{error}</p>
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={paymentLoading}
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {paymentLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processing Payment...
                                                </>
                                            ) : (
                                                <>
                                                    <CreditCard className="w-5 h-5" />
                                                    Pay ₹{totalAmount}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const PaymentModal = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentModalContent {...props} />
        </Elements>
    );
};

export default PaymentModal;
