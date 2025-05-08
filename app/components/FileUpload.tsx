'use client'

import { IKUpload } from 'imagekitio-next'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import { useState } from 'react'
import { Loader2, Upload } from 'lucide-react'

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progress: number) => void
    fileType?: 'image' | 'video'
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = 'image',
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onError = (err: { message: string }) => {
        setError(err.message)
        setUploading(false)
    }

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false)
        setError(null)
        onSuccess(response)
    }

    const handleStartUpload = () => {
        setUploading(true)
        setError(null)
    }

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const percentComplete = (evt.loaded / evt.total) * 100
            onProgress(Math.round(percentComplete))
        }
    }

    const validateFile = (file: File) => {
        if (fileType === 'video') {
            if (!file.type.startsWith('video/')) {
                setError('Please upload a valid video file')
                return false
            }
            if (file.size > 100 * 1024 * 1024) {
                setError('Video size must be less than 100MB')
                return false
            }
        } else {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!validTypes.includes(file.type)) {
                setError(
                    'Please upload a valid image file (JPEG, PNG, or WebP)',
                )
                return false
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB')
                return false
            }
        }
        return true
    }

    return (
        <div className="space-y-2 w-full">
            <div className="relative">
                <IKUpload
                    fileName={fileType === 'video' ? 'video' : 'image'}
                    onError={onError}
                    onSuccess={handleSuccess}
                    onUploadStart={handleStartUpload}
                    onUploadProgress={handleProgress}
                    accept={fileType === 'video' ? 'video/*' : 'image/*'}
                    className="file-input file-input-bordered w-full h-12 md:h-14 text-sm md:text-base"
                    validateFile={validateFile}
                    useUniqueFileName={true}
                    folder={fileType === 'video' ? '/videos' : '/images'}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Upload className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">
                            {fileType === 'video' ? 'Upload Video' : 'Upload Image'}
                        </span>
                    </div>
                </div>
            </div>

            {uploading && (
                <div className="flex items-center gap-2 text-sm md:text-base text-primary">
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    <span>Uploading...</span>
                </div>
            )}

            {error && (
                <div className="text-error text-sm md:text-base bg-error/10 p-2 rounded-md">
                    {error}
                </div>
            )}
        </div>
    )
}
