"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { FiEye, FiEyeOff, FiX } from "react-icons/fi"
import { useAuth } from '@/lib/auth-context'
import GradientButton from './Utility/GradientButton'

export function LoginForm({
    className,
    onClose,
    onSwitchToSignup,
    ...props
}) {
    const { login, isLoading: authLoading, error } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [formData, setFormData] = useState({
        identifier: "", // Changed from username/email to identifier
        password: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear any previous messages when user starts typing
        if (message.text) {
            setMessage({ type: '', text: '' })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const result = await login(formData.identifier, formData.password)

            if (result.success) {
                setMessage({ type: 'success', text: 'Login successful! Welcome back!' })
                
                // Close modal after successful login
                setTimeout(() => {
                    onClose()
                }, 1500)
            } else {
                setMessage({ type: 'error', text: result.message || 'Login failed' })
            }
        } catch (error) {
            console.error('Login error:', error)
            setMessage({ type: 'error', text: 'Network error. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-2xl">
                <CardHeader className="text-center relative">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={onClose}
                    >
                        <FiX className="h-4 w-4" />
                    </Button>
                    
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                        Sign in to your Nova Coders account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Message Display */}
                    {message.text && (
                        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                            message.type === 'success' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            {/* Username or Email Field */}
                            <div className="grid gap-3">
                                <Label htmlFor="identifier" className="text-gray-700 dark:text-gray-300 font-medium">
                                    Username or Email
                                </Label>
                                <Input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    placeholder="Enter your username or email"
                                    value={formData.identifier}
                                    onChange={handleInputChange}
                                    className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Password Field with Show/Hide Toggle */}
                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Password
                                    </Label>
                                    <a
                                        href="#"
                                        className="text-sm text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 pr-10"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <FiEye className="h-4 w-4 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <GradientButton 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full py-3 font-semibold"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Signing In...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </GradientButton>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4 hover:text-cyan-500 dark:hover:text-cyan-400 font-medium transition-colors duration-200"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
