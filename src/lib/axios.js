// import Axios from 'axios'

// const axios = Axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5233',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
// })

// // Request interceptor
// axios.interceptors.request.use(
//     (config) => {
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('token')
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`
//             }
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// )

// // Response interceptor
// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             if (typeof window !== 'undefined') {
//                 localStorage.removeItem('token')
//                 localStorage.removeItem('remember_token')
//             }
//         }
//         return Promise.reject(error)
//     }
// )

// export default axios

























import Axios from 'axios'

// Function to get the backend URL dynamically
const getBackendUrl = () => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname

        // If accessing via network IP, use the same IP for backend
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return `http://${hostname}:5233`
        }
    }

    // Default for localhost
    return 'http://192.168.43.215:5233'  // Use your PC's network IP here
}

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || getBackendUrl(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Request interceptor
axios.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('remember_token')
            }
        }
        return Promise.reject(error)
    }
)

export default axios
