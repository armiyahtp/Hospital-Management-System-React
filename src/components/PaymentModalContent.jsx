import React, { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
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
    Stethoscope,
    FileText,
    Star,
    Lock,
    Sparkles,
    Zap,
    Heart,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { axiosinstance } from "../config/axios";
import toast from "react-hot-toast";

const PaymentModalContent = ({ token, doctor, paymentId, onPaymentSuccess, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPostPaymentForm, setShowPostPaymentForm] = useState(false);
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState(null);

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










    const handlePayment = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);
        setError("");

        if (!stripe || !elements) {
            setError("Payment system not ready. Please try again.");
            setPaymentLoading(false);
            return;
        }

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin,
                },
                redirect: "if_required",
            });

            if (stripeError) {
                console.log("Stripe payment error:", stripeError);
                setError(stripeError.message);
                setPaymentLoading(false);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                setShowPostPaymentForm(true);
                setPaymentIntentId(paymentIntent.id);
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













    const handlePostPaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);

        try {
            const response = await axiosinstance.post(
                `appointment/confirm/${token?.id}/`,
                {
                    payment_id: paymentId,
                    payment_intent_id: paymentIntentId,
                    reason: reason,
                    notes: notes
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
        } catch (err) {
            console.log("Form error:", err);
            setError(err.response?.data?.error || err.message || "Failed to submit Form");
        } finally {
            setPaymentLoading(false);
        }
    };










    const pid = Number(paymentId);
    const deletPaymentIntent = async () => {
        try {
            const response = await axiosinstance.delete(`appointment/cancel/${pid}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` }
            });
            onClose();
        } catch (error) {
            console.log(error);
            toast.error('Failed to cancel payment');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 rounded-t-3xl text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <CreditCard className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Complete Payment</h2>
                                        <p className="text-blue-100 flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Secure payment gateway
                                        </p>
                                    </div>
                                </div>
                                {!showPostPaymentForm && (
                                    <button
                                        onClick={deletPaymentIntent}
                                        className="p-3 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>

                            {/* Progress Indicator */}
                            {!success && (
                                <div className="mt-6 flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${!showPostPaymentForm ? 'bg-white' : 'bg-white/50'}`}></div>
                                    <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${!showPostPaymentForm ? 'bg-white/30' : 'bg-white'}`}></div>
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${showPostPaymentForm ? 'bg-white' : 'bg-white/50'}`}></div>
                                    <div className="text-sm text-blue-100 ml-3 font-medium">
                                        {!showPostPaymentForm ? 'Payment Details' : 'Additional Information'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <CheckCircle className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h3>
                                <p className="text-gray-600 text-lg mb-8">Your appointment has been confirmed and you'll receive a confirmation email shortly.</p>

                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                                        <Heart className="w-5 h-5" />
                                        <span>Thank you for choosing our healthcare services!</span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : showPostPaymentForm ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Success Header */}
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Completed!</h3>
                                    <p className="text-gray-600">Please provide additional information to help us serve you better.</p>
                                </div>

                                {/* Post Payment Form */}
                                <form onSubmit={handlePostPaymentSubmit} className="space-y-6">
                                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                                        <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-white" />
                                            </div>
                                            Additional Information
                                        </h4>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                                    Reason for Visit <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    placeholder="Please describe the reason for your visit in detail..."
                                                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                                                    rows={4}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                                    Additional Notes
                                                </label>
                                                <textarea
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Any additional information you'd like to share with the doctor (symptoms, concerns, questions, etc.)..."
                                                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3"
                                        >
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <p className="text-red-800 font-medium">{error}</p>
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={paymentLoading || !reason.trim()}
                                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                    >
                                        {paymentLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Completing Appointment...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Complete Appointment
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <>
                                {/* Appointment Summary */}
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-8 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                            <Stethoscope className="w-5 h-5 text-white" />
                                        </div>
                                        Appointment Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-lg">
                                                    Dr. {doctor?.doctor?.first_name} {doctor?.doctor?.last_name}
                                                </p>
                                                <p className="text-blue-600 font-semibold">
                                                    {doctor?.doctor?.department?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-lg">{token?.appointment_date}</p>
                                                <p className="text-green-600 font-semibold">
                                                    {formatTime(token?.start_time)} - {formatTime(token?.end_time)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Summary */}
                                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 mb-8 border border-blue-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                            <Star className="w-5 h-5 text-white" />
                                        </div>
                                        Payment Summary
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-4 px-6 bg-white rounded-2xl shadow-sm">
                                            <span className="text-gray-600 font-semibold">Registration Fee</span>
                                            <span className="font-bold text-gray-800 text-lg">₹{registrationFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 px-6 bg-white rounded-2xl shadow-sm">
                                            <span className="text-gray-600 font-semibold">Consultation Fee</span>
                                            <span className="font-bold text-gray-800 text-lg">₹{doctorFee}</span>
                                        </div>
                                        <div className="border-t-2 border-blue-200 pt-4">
                                            <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg">
                                                <span className="text-lg font-bold">Total Amount</span>
                                                <span className="text-2xl font-bold">₹{totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method Info */}
                                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 mb-8 border border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                                            <CreditCard className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Credit/Debit Card Payment</h3>
                                            <p className="text-gray-600">Visa, Mastercard, American Express</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
                                        <div className="space-y-6">
                                            <label className="block text-lg font-bold text-gray-700 mb-4">
                                                Card Details
                                            </label>

                                            <div className="w-full border-2 border-gray-200 rounded-2xl p-6 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                                                <PaymentElement />
                                            </div>

                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Lock className="w-5 h-5 text-blue-600" />
                                                    <span className="font-bold text-gray-700">Test Mode Instructions</span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <p className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4" />
                                                        Use test card: <span className="font-mono font-bold">4242 4242 4242 4242</span>, any future date, any CVV
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3"
                                        >
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <p className="text-red-800 font-medium">{error}</p>
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={paymentLoading || error}
                                        className="w-full text-white py-5 rounded-2xl font-bold text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-lg hover:shadow-xl transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                                    >
                                        {paymentLoading ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                Processing Payment...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-6 h-6" />
                                                Pay ₹{totalAmount} with Card
                                                <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Security Footer */}
                                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold">256-bit SSL</span>
                                        </div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold">PCI Compliant</span>
                                        </div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold">Secure Payment</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaymentModalContent;