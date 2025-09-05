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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { FiEye, FiEyeOff, FiX, FiCheck, FiAlertCircle } from "react-icons/fi"
import { useAuth } from '@/lib/auth-context'
import GradientButton from './Utility/GradientButton'

export function SignupForm({
    className,
    onClose,
    onSwitchToLogin,
    ...props
}) {
    const { register, isLoading: authLoading, error } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [usernameChecking, setUsernameChecking] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profession: "",
        course: "",
        branch: "",
        collegeName: "",
        phoneNumber: "",
        city: "",
        yearOfStudy: ""
    })

    const [validationErrors, setValidationErrors] = useState({})

    // Password strength validation
    const validatePassword = (password) => {
        const minLength = password.length >= 6  // Reduced from 8 for faster signup
        
        return {
            minLength,
            hasUpperCase: true,  // Simplified validation for speed
            hasLowerCase: true,
            hasNumbers: true,
            hasSpecialChar: true,
            isValid: minLength  // Only check minimum length for speed
        }
    }

    // Check username availability
    const checkUsernameAvailability = async (username) => {
        if (username.length < 3) return
        
        setUsernameChecking(true)
        try {
            const response = await fetch(`/api/auth/check-username?username=${username}`)
            const data = await response.json()
            setUsernameAvailable(data.available)
        } catch (error) {
            console.error('Username check error:', error)
        } finally {
            setUsernameChecking(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear validation errors when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        // Check username availability
        if (name === 'username' && value.length >= 3) {
            const timeoutId = setTimeout(() => {
                checkUsernameAvailability(value)
            }, 500)
            return () => clearTimeout(timeoutId)
        }

        // Clear any previous messages when user starts typing
        if (message.text) {
            setMessage({ type: '', text: '' })
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear validation errors
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Prevent copy/paste on password fields
    const handlePasswordKeyDown = (e) => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
            e.preventDefault()
            return false
        }
    }

    const validateForm = () => {
        const errors = {}

        // Name validation
        if (!formData.firstName.trim()) errors.firstName = 'First name is required'
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required'

        // Username validation
        if (!formData.username.trim()) {
            errors.username = 'Username is required'
        } else if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters'
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            errors.username = 'Username can only contain letters, numbers, and underscores'
        } else if (usernameAvailable === false) {
            errors.username = 'Username is already taken'
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        // Password validation
        const passwordValidation = validatePassword(formData.password)
        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (!passwordValidation.isValid) {
            errors.password = 'Password does not meet requirements'
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        // Profession validation
        if (!formData.profession) {
            errors.profession = 'Please select your profession'
        }

        // Student-specific validation
        if (formData.profession === 'student') {
            if (!formData.course.trim()) errors.course = 'Course is required for students'
            if (!formData.branch.trim()) errors.branch = 'Branch is required for students'
            if (!formData.collegeName.trim()) errors.collegeName = 'College name is required for students'
            if (!formData.yearOfStudy) errors.yearOfStudy = 'Year of study is required for students'
        }

        // Phone validation
        const phoneRegex = /^[+]?[\d\s-()]+$/
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number'
        }

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            setMessage({ type: 'error', text: 'Please fix the errors below' })
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const result = await register(formData)

            if (result.success) {
                setMessage({ type: 'success', text: 'Account created successfully! Welcome to Nova Coders!' })
                
                // Close modal after successful signup and login
                setTimeout(() => {
                    onClose()
                }, 1500)
            } else {
                setMessage({ type: 'error', text: result.message || 'Signup failed' })
            }
        } catch (error) {
            console.error('Signup error:', error)
            setMessage({ type: 'error', text: 'Network error. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const passwordValidation = validatePassword(formData.password)

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto", className)} {...props}>
            <Card className="bg-gradient-to-br from-green-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 border-2 border-green-200 dark:border-slate-700 shadow-2xl">
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
                    
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Join Nova Coders
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                        Create your account and start your coding journey
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
                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300 font-medium">
                                        First Name *
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                                            validationErrors.firstName ? 'border-red-500' : ''
                                        }`}
                                        required
                                    />
                                    {validationErrors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                                    )}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Last Name *
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                                            validationErrors.lastName ? 'border-red-500' : ''
                                        }`}
                                        required
                                    />
                                    {validationErrors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Username Field with availability check */}
                            <div className="grid gap-3">
                                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 font-medium">
                                    Username *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Choose a unique username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 pr-10 ${
                                            validationErrors.username ? 'border-red-500' : 
                                            usernameAvailable === true ? 'border-green-500' : 
                                            usernameAvailable === false ? 'border-red-500' : ''
                                        }`}
                                        required
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {usernameChecking ? (
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                        ) : usernameAvailable === true ? (
                                            <FiCheck className="h-4 w-4 text-green-500" />
                                        ) : usernameAvailable === false ? (
                                            <FiAlertCircle className="h-4 w-4 text-red-500" />
                                        ) : null}
                                    </div>
                                </div>
                                {validationErrors.username && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
                                )}
                                {usernameAvailable === true && (
                                    <p className="text-green-500 text-xs mt-1">Username is available!</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                                    Email *
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                                        validationErrors.email ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.email && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                                )}
                            </div>

                            {/* Password Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Password *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onKeyDown={handlePasswordKeyDown}
                                            onContextMenu={(e) => e.preventDefault()}
                                            className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 pr-10 ${
                                                validationErrors.password ? 'border-red-500' : ''
                                            }`}
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
                                    {/* Fixed height container for validation message to prevent layout shift */}
                                    <div className="h-5">
                                        {validationErrors.password && (
                                            <p className="text-red-500 text-xs">{validationErrors.password}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Confirm Password *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            onKeyDown={handlePasswordKeyDown}
                                            onContextMenu={(e) => e.preventDefault()}
                                            className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 pr-10 ${
                                                validationErrors.confirmPassword ? 'border-red-500' : 
                                                formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' : ''
                                            }`}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <FiEyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <FiEye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                    {/* Fixed height container for validation message to prevent layout shift */}
                                    <div className="h-5">
                                        {validationErrors.confirmPassword && (
                                            <p className="text-red-500 text-xs">{validationErrors.confirmPassword}</p>
                                        )}
                                        {formData.confirmPassword && formData.password === formData.confirmPassword && !validationErrors.confirmPassword && (
                                            <p className="text-green-500 text-xs">✓ Passwords match</p>
                                        )}
                                    </div>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <p className="text-green-500 text-xs mt-1">Passwords match!</p>
                                    )}
                                </div>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="grid gap-2">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Requirements:</p>
                                    <div className="grid grid-cols-1 gap-1 text-xs">
                                        <div className={`flex items-center gap-1 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                                            {passwordValidation.minLength ? <FiCheck className="h-3 w-3" /> : <FiAlertCircle className="h-3 w-3" />}
                                            At least 6 characters
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Profession Selection */}
                            <div className="grid gap-3">
                                <Label htmlFor="profession" className="text-gray-700 dark:text-gray-300 font-medium">
                                    Profession *
                                </Label>
                                <Select value={formData.profession} onValueChange={(value) => handleSelectChange('profession', value)}>
                                    <SelectTrigger className={`h-12 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-400 transition-all duration-200 ${
                                        validationErrors.profession ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                                    }`}>
                                        <SelectValue placeholder="Select your profession" className="text-gray-600 dark:text-gray-300" />
                                    </SelectTrigger>
                                    <SelectContent className="z-[10000] border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                                        <SelectItem value="student" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>🎓</span> Student
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="developer" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>💻</span> Software Developer
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="designer" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>🎨</span> UI/UX Designer
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="engineer" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>⚙️</span> Engineer
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="freelancer" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>💼</span> Freelancer
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="entrepreneur" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>🚀</span> Entrepreneur
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="other" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span>🔧</span> Other
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {validationErrors.profession && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.profession}</p>
                                )}
                            </div>

                            {/* Student-specific fields */}
                            {formData.profession === 'student' && (
                                <div className="grid gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <h3 className="font-semibold text-blue-700 dark:text-blue-300">Student Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="course" className="text-gray-700 dark:text-gray-300 font-medium">
                                                Course/Degree *
                                            </Label>
                                            <Input
                                                id="course"
                                                name="course"
                                                type="text"
                                                placeholder="e.g., B.Tech, MCA, BCA"
                                                value={formData.course}
                                                onChange={handleInputChange}
                                                className={`border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 ${
                                                    validationErrors.course ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {validationErrors.course && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.course}</p>
                                            )}
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="branch" className="text-gray-700 dark:text-gray-300 font-medium">
                                                Branch/Specialization *
                                            </Label>
                                            <Input
                                                id="branch"
                                                name="branch"
                                                type="text"
                                                placeholder="e.g., Computer Science, IT"
                                                value={formData.branch}
                                                onChange={handleInputChange}
                                                className={`border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 ${
                                                    validationErrors.branch ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {validationErrors.branch && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.branch}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="collegeName" className="text-gray-700 dark:text-gray-300 font-medium">
                                            College/University Name *
                                        </Label>
                                        <Input
                                            id="collegeName"
                                            name="collegeName"
                                            type="text"
                                            placeholder="Enter your college/university name"
                                            value={formData.collegeName}
                                            onChange={handleInputChange}
                                            className={`border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 ${
                                                validationErrors.collegeName ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {validationErrors.collegeName && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.collegeName}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="yearOfStudy" className="text-gray-700 dark:text-gray-300 font-medium">
                                            Year of Study *
                                        </Label>
                                        <Select value={formData.yearOfStudy} onValueChange={(value) => handleSelectChange('yearOfStudy', value)}>
                                            <SelectTrigger className={`h-11 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-400 transition-all duration-200 ${
                                                validationErrors.yearOfStudy ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                                            }`}>
                                                <SelectValue placeholder="Select year of study" className="text-gray-600 dark:text-gray-300" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[10000] border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                                                <SelectItem value="1st" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>1️⃣</span> 1st Year
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="2nd" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>2️⃣</span> 2nd Year
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="3rd" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>3️⃣</span> 3rd Year
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="4th" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>4️⃣</span> 4th Year
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="5th" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>5️⃣</span> 5th Year
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="postgraduate" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <span>🎓</span> Post Graduate
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {validationErrors.yearOfStudy && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.yearOfStudy}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Optional Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Phone Number (Optional)
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                                            validationErrors.phoneNumber ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {validationErrors.phoneNumber && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>
                                    )}
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="city" className="text-gray-700 dark:text-gray-300 font-medium">
                                        City (Optional)
                                    </Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Your city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <GradientButton 
                                type="submit" 
                                className="w-full py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={isLoading || !passwordValidation.isValid || usernameAvailable === false ? undefined : undefined}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </GradientButton>
                        </div>

                        {/* Switch to Login */}
                        <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-green-600 dark:text-green-400 underline underline-offset-4 hover:text-green-700 dark:hover:text-green-300 font-medium"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
