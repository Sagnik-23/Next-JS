import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length === 0) {
            return Response.json([], { status: 404 })
        }
        return Response.json(videos, { status: 200 })
    } catch (error) {
        console.error("Error fetching videos:", error);
        return Response.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const body: IVideo = await request.json();

        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
}