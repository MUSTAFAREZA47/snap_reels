'use client'

import VideoUploadForm from '../components/VideoUploadForm'

export default function VideoUploadPage() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full bg-base-200 shadow-xl rounded-2xl p-8">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">
                    Upload New Reel
                </h1>
                <p className="text-lg text-gray-500 mb-6 text-center">
                    Share your creativity with the world! Upload your reels and
                    get discovered.
                </p>

                <VideoUploadForm />

                <p className="mt-6 text-sm text-center text-gray-400">
                    Ensure your video meets the community guidelines for the
                    best experience.
                </p>
            </div>
        </div>
    )
}
