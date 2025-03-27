'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNotification } from '../components/Notification'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { showNotification } = useNotification()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            showNotification(result.error, 'error')
        } else {
            showNotification('Login successful!', 'success')
            router.push('/')
        }

        setLoading(false)
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 font-medium"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
                <p className="text-center">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}
