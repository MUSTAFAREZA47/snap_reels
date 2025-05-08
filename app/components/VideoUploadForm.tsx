'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import { Loader2 } from 'lucide-react'
import { useNotification } from './Notification'
import { apiClient } from '@/lib/api-client'
import FileUpload from './FileUpload'
import { motion } from 'framer-motion'

interface VideoFormData {
    title: string
    description: string
    videoUrl: string
    thumbnailUrl: string
}

export default function VideoUploadForm() {
    const [loading, setLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const { showNotification } = useNotification()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VideoFormData>({
        defaultValues: {
            title: '',
            description: '',
            videoUrl: '',
            thumbnailUrl: '',
        },
    })

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue('videoUrl', response.filePath)
        setValue('thumbnailUrl', response.thumbnailUrl || response.filePath)
        showNotification('Video uploaded successfully!', 'success')
    }

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress)
    }

    const onSubmit = async (data: VideoFormData) => {
        if (!data.videoUrl) {
            showNotification('Please upload a video first', 'error')
            return
        }

        setLoading(true)
        try {
            await apiClient.createVideo(data)
            showNotification('Video published successfully!', 'success')

            // Reset form after successful submission
            setValue('title', '')
            setValue('description', '')
            setValue('videoUrl', '')
            setValue('thumbnailUrl', '')
            setUploadProgress(0)
        } catch (error) {
            showNotification(
                error instanceof Error
                    ? error.message
                    : 'Failed to publish video',
                'error',
            )
        } finally {
            setLoading(false)
        }
    }

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="space-y-2"
                variants={itemVariants}
            >
                <label
                    htmlFor="title"
                    className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className={`w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
                        errors.title ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                    placeholder="Enter video title"
                    {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                    >
                        {errors.title.message}
                    </motion.span>
                )}
            </motion.div>

            <motion.div
                className="space-y-2"
                variants={itemVariants}
            >
                <label
                    htmlFor="description"
                    className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    className={`w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 min-h-[100px] ${
                        errors.description ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                    placeholder="Enter video description"
                    {...register('description', {
                        required: 'Description is required',
                    })}
                />
                {errors.description && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                    >
                        {errors.description.message}
                    </motion.span>
                )}
            </motion.div>

            <motion.div
                className="space-y-2"
                variants={itemVariants}
            >
                <label
                    className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                    Upload Video: Ratio - 1080*1920
                </label>
                <div className="video-upload-container">
                    <FileUpload
                        fileType="video"
                        onSuccess={handleUploadSuccess}
                        onProgress={handleUploadProgress}
                    />
                    {uploadProgress > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2"
                        >
                            <motion.div
                                className="bg-blue-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <motion.button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !uploadProgress}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
            >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        <span>Publishing Video...</span>
                    </div>
                ) : (
                    'Publish Video'
                )}
            </motion.button>
        </motion.form>
    )
}
