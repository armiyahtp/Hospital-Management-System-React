import axios from 'axios'

export const axiosinstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/customers/",
    withCredentials: true
})

// Add request interceptor to include auth token
axiosinstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add response interceptor to handle auth errors
axiosinstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear it and redirect to login
            localStorage.removeItem('Token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)