import React from "react";
import { useForm } from "react-hook-form";
import bg from "../assets/bg2.png";
import { Link } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Register Data:", data);
    };

    // Watch password for confirm validation
    const password = watch("password");

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-start px-6 md:px-0"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="md:ml-12 lg:ml-24 w-[380px] md:w-[600px] p-8 rounded-2xl backdrop-blur-lg bg-white/20 shadow-xl border border-white/30">
                <h2 className="text-3xl font-bold text-[#00526b] text-center mb-6">
                    Register
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label className="text-[#00526b] text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1 mt-4 md:mt-0">
                            <label className="text-[#00526b] text-sm">Phone Number</label>
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
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.phone_number && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.phone_number.message}
                                </p>
                            )}
                        </div>
                    </div>

                   
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label className="text-[#00526b] text-sm">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                {...register("first_name", { required: "First name is required" })}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.first_name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.first_name.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1 mt-4 md:mt-0">
                            <label className="text-[#00526b] text-sm">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                {...register("last_name", { required: "Last name is required" })}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.last_name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.last_name.message}
                                </p>
                            )}
                        </div>
                    </div>

                    
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label className="text-[#00526b] text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1 mt-4 md:mt-0">
                            <label className="text-[#00526b] text-sm">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirm_password", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-white/30 focus:border-[#31dbf8]"
                            />
                            {errors.confirm_password && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.confirm_password.message}
                                </p>
                            )}
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#00729d] hover:bg-[#00aad9] text-white font-semibold shadow-lg transition duration-200"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-[#00526b] text-center mt-6">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-[#2a95be] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
