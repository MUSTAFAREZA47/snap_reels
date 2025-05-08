'use client'

import VideoUploadForm from '../components/VideoUploadForm'
import { motion } from 'framer-motion'

export default function VideoUploadPage() {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-3xl mx-auto"
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
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Upload New Reel
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                            Share your creativity with the world! Upload your reels and
                            get discovered.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <VideoUploadForm />
                    </motion.div>

                    <motion.p
                        className="mt-6 text-sm md:text-base text-center text-gray-500 dark:text-gray-400"
                        variants={itemVariants}
                    >
                        Ensure your video meets the community guidelines for the
                        best experience.
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    )
}
