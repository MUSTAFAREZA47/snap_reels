'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Home, User, Upload, Search } from 'lucide-react'
import { useNotification } from './Notification'

export default function Header() {
    const { data: session } = useSession()
    const { showNotification } = useNotification()

    const handleSignOut = async () => {
        try {
            await signOut()
            showNotification('Signed out successfully', 'success')
        } catch {
            showNotification('Failed to sign out', 'error')
        }
    }

    return (
        <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-all"
                    onClick={() =>
                        showNotification('Welcome to Snap Reels', 'info')
                    }
                >
                    <Home className="w-6 h-6" />
                    Snap Reels
                </Link>

                {/* Search Bar */}
                <div className="hidden sm:flex items-center relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search reels..."
                        className="input input-bordered w-full pr-10"
                    />
                    <Search className="absolute right-3 w-5 h-5 text-gray-400" />
                </div>

                {/* User Dropdown */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            <Link
                                href="/upload"
                                className="btn btn-primary flex items-center gap-2"
                                onClick={() =>
                                    showNotification(
                                        'Go to Upload Page',
                                        'info',
                                    )
                                }
                            >
                                <Upload className="w-4 h-4" />
                                Upload
                            </Link>

                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-circle btn-ghost"
                                >
                                    <User className="w-6 h-6" />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4"
                                >
                                    <li className="p-2 text-sm font-semibold text-gray-600">
                                        {session.user?.email?.split('@')[0]}
                                    </li>
                                    <div className="divider my-1" />
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="btn btn-error btn-sm w-full"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="btn btn-secondary"
                            onClick={() =>
                                showNotification(
                                    'Please sign in to continue',
                                    'info',
                                )
                            }
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
