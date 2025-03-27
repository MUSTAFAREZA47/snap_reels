'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNotification } from '../components/Notification'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

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

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center">
                Create an Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block font-medium mb-2"
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
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block font-medium mb-2"
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
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Registering...
                        </div>
                    ) : (
                        'Register'
                    )}
                </button>

                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}
