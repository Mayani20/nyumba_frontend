import { useState, useEffect } from 'react'  // Add useState here
import { useRouter, useParams } from 'next/navigation'
import axios from '@/lib/axios'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    // Get token from localStorage
    const getToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')
        }
        return null
    }

    // Save token to localStorage
    const saveToken = (token, rememberToken = null) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token)
            if (rememberToken) {
                localStorage.setItem('remember_token', rememberToken)
            }
        }
    }

    // Remove token from localStorage
    const removeToken = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            localStorage.removeItem('remember_token')
        }
    }

    // Get auth headers
    const getAuthHeaders = () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchUser = async () => {
    try {
        const token = getToken()
        if (!token) return null

        const response = await axios.get('/Auth/user', {
            headers: getAuthHeaders()
        })

        if (response.data.success) {
            return response.data.data
        }
        return null
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Unauthorized while fetching user, do NOT remove token here")
            // removeToken()  <-- COMMENT OUT for now
        }
        return null
    }
}

    // Initialize user state
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true)
            const userData = await fetchUser()
            setUser(userData)
            setIsLoading(false)
        }
        loadUser()
    }, [])

    const register = async ({ setErrors, ...props }) => {
        setErrors([])
        setError(null)

        try {
            const response = await axios.post('/Auth/register', {
                name: props.name,
                email: props.email,
                password: props.password,
                confirmPassword: props.password_confirmation
            })

            if (response.data.success) {
                saveToken(response.data.data.token)
                const userData = await fetchUser()
                setUser(userData)
            }
        } catch (error) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors || { email: ['Registration failed'] })
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)
        setError(null)

        try {
            const response = await axios.post('/Auth/login', {
                email: props.email,
                password: props.password,
                remember: props.remember || false
            })

            if (response.data.success) {
                saveToken(response.data.data.token, response.data.data.rememberToken)
                const userData = await fetchUser()
                setUser(userData)

                if (redirectIfAuthenticated) {
                    router.push(redirectIfAuthenticated)
                }
            } else {
                setErrors(response.data.errors || { email: ['Login failed'] })
            }
        } catch (error) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors || { email: ['Invalid credentials'] })
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        setErrors([])
        setStatus(null)
        setError(null)

        try {
            const response = await axios.post('/Auth/forgot-password', { email })

            if (response.data.success) {
                setStatus(response.data.message)
            } else {
                setErrors(response.data.errors || { email: ['Failed to send reset link'] })
            }
        } catch (error) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors || { email: ['Failed to send reset link'] })
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)
        setError(null)

        try {
            const response = await axios.post('/Auth/reset-password', {
                email: props.email,
                password: props.password,
                confirmPassword: props.password_confirmation,
                token: params.token || props.token
            })

            if (response.data.success) {
                setStatus(response.data.message)
                setTimeout(() => router.push('/login?reset=' + btoa(response.data.message)), 2000)
            } else {
                setErrors(response.data.errors || { email: ['Failed to reset password'] })
            }
        } catch (error) {
            if (error.response?.status !== 422) throw error
            setErrors(error.response.data.errors || { email: ['Failed to reset password'] })
        }
    }

    const resendEmailVerification = ({ setStatus }) => {
        setStatus('Email verification not implemented yet')
    }

    const logout = async () => {
        try {
            await axios.post('/Auth/logout', {}, {
                headers: getAuthHeaders()
            })
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            removeToken()
            setUser(null)
            window.location.pathname = '/login'
        }
    }

    // Handle middleware redirects
    useEffect(() => {
        if (isLoading) return

        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && !user && !isLoading) {
            router.push('/login')
        }
    }, [user, isLoading, middleware, redirectIfAuthenticated])

    return {
        user,
        isLoading,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
