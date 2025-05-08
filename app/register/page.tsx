'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNotification } from '../components/Notification'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { showNotification } = useNotification()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            showNotification(
                'Registration successful! Please log in.',
                'success',
            )
            router.push('/login')
        } catch (error) {
            showNotification(
                error instanceof Error ? error.message : 'Registration failed',
                'error',
            )
        } finally {
            setLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
                    variants={itemVariants}
                >
                    <motion.div
                        className="text-center mb-8"
                        variants={itemVariants}
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Create Your Account
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                            Join our community today
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                        >
                            <label
                                htmlFor="email"
                                className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                            />
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                        >
                            <label
                                htmlFor="password"
                                className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                            />
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            variants={itemVariants}
                        >
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Re-enter your password"
                                className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center px-4 py-2.5 text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            variants={itemVariants}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </motion.button>

                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </div>
    )
}
