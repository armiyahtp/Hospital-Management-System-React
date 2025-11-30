import axios from 'axios'

// Backend URL will auto-switch based on environment
const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8000/api/v1/customers/"
        : "https://hospital-management-system-django-awep.onrender.com/api/v1/customers/"

export const axiosinstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

// Add request interceptor
axiosinstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Add response interceptor
axiosinstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("Token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)
