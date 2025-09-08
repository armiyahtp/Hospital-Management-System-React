import React from "react";
import { useForm } from "react-hook-form";
import bg from '../assets/bg2.png'
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axios";
import toast from "react-hot-toast";
import { useSign } from "../context/SignContext";

const Login = () => {

    const navigate = useNavigate()

    const { isAuth } = useSign()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        try {
            const response = await axiosinstance.post('login/', data)
            if(response?.data.status_code === 6000){
                const token = response.data.data.access
                isAuth(token)
                toast.success(response.data.message)
                navigate('/')
            }else if(response?.data.status_code === 6001){
                toast.error(response.data.error)
            }else{
                toast.error('Login Failed')
            }
        } catch (error) {
            console.log(error)
            toast.error('An unexpected error occurred')
        }
    };

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-start px-6 md:px-0"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            
            <div className="md:ml-12 lg:ml-44 w-[400px] p-8 rounded-2xl backdrop-blur-lg bg-[#ffffffc3] shadow-xl border border-white/30">
                <h2 className="text-3xl font-bold text-[#00526b] text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    
                    <div>
                        <label className="text-[#00526b] text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-[#156776]/20 focus:border-[#31dbf8]"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    
                    <div>
                        <label className="text-[#00526b] text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/20 placeholder-[#6e919f] outline-none border border-[#156776]/20 focus:border-[#31dbf8]"
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#00729d] hover:bg-[#00aad9] text-white font-semibold shadow-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-[#00526b] text-center mt-6">
                    Don't have an account?{" "}
                    <Link to={'/register'} className="text-[#2a95be] hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
