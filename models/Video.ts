import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    _id?: mongoose.Types.ObjectId;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality: number;
    }  
    createdAt?: Date;
    updatedAt?: Date;   
}

const VideoSchema = new mongoose.Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
        controls: { type: Boolean, default: false },
        transformation: {
            height: { type: Number, default: VIDEO_DIMENSIONS.height },
            width: { type: Number, default: VIDEO_DIMENSIONS.width },
            quality: { type: Number, min: 1, max: 100, default: 100 },
        },
    },
    { timestamps: true },
);

const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;