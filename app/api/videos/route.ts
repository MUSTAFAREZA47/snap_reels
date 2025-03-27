import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Path: reels_pro/app/api/video/route.ts
// Getting all videos
export async function GET() {
    try {
        await dbConnect();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(videos, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Failed to fetch videos" }, { status: 500 });
    }
}


// Path: reels_pro/app/api/video/route.ts
// Creating a new video
export async function POST(request: NextRequest) {
    try {
        // Get the session
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        // Connect to the database
        await dbConnect();

        // Get the body of the request
        const body:IVideo = await request.json();

        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const videoData = {
            ...body,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            },
            controls: body.controls ?? true,
        }

        // Create a new video
        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo, { status: 201 });

    } catch {
        return NextResponse.json({ message: "Failed to create video" }, { status: 500 });
    }
}