import { IVideo } from '@/models/Video'

export type VideoFormData = Omit<IVideo, '_id'>

type FetchOptions<TBody = unknown> = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: TBody
    headers?: Record<string, string>
}

class ApiClient {
    private async fetch<T, TBody = unknown>(
        endpoint: string,
        options: FetchOptions<TBody> = {},
    ): Promise<T> {
        const { method = 'GET', body, headers = {} } = options

        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            throw new Error(await response.text())
        }

        return response.json() as Promise<T>
    }

    async getVideos(): Promise<IVideo[]> {
        return this.fetch<IVideo[]>('/videos')
    }

    async getVideo(id: string): Promise<IVideo> {
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData: VideoFormData): Promise<IVideo> {
        return this.fetch<IVideo, VideoFormData>('/videos', {
            method: 'POST',
            body: videoData,
        })
    }
}

export const apiClient = new ApiClient()
