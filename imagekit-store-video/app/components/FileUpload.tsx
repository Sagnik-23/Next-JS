"use client" // This component must be a client component

import { useSession } from "next-auth/react";
import type { UploadResponse } from "@imagekit/next";
import {
    upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
    fileType?: "image" | "video";
    onSuccess?: (res: UploadResponse) => void;
    onProgress?: (progress: number) => void;
}




const FileUpload = ({ fileType, onSuccess, onProgress }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    // const { data: session } = useSession();
    const { data: session } = useSession();
    const userId = session?.user?.id;


    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Invalid file type. Please upload a video file.");
                throw new Error("Invalid file type. Please upload a video file.");
            }
        }
        if (file.size > 100 * 1024 * 1024) { // 100 MB limit
            setError("File size exceeds the limit of 100 MB.");
            throw new Error("File size exceeds the limit of 100 MB.");
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) {
            return;
        }
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const authData = await authRes.json();
            // console.log("Auth Data:", authData.authenticationParameters.token);


            const res = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: authData.authenticationParameters.signature,
                expire: authData.authenticationParameters.expire,
                token: authData.authenticationParameters.token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100
                        onProgress(Math.round(percent))
                        setProgress(Math.round(percent));
                    }
                }
            })
            console.log("Upload Response:", res);
            await fetch("/api/video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: res.name, // Use your form data
                    description: "Some description",
                    videoUrl: res.filePath,
                    thumbnailUrl: res.thumbnailUrl || res.url + "?tr=w-400",
                    transformation: {
                        quality: 90,
                    },
                    userId// Assuming you have a way to get the user ID
                })
            })
            onSuccess?.(res);
        } catch (error) {
            console.error("Upload error:", error);

        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto text-white p-4 bg-gray-900 rounded-lg shadow">
                <label className="block text-sm font-medium mb-2">
                    Upload {fileType === "video" ? "Video" : "Image"}
                </label>

                <input
                    type="file"
                    accept={fileType === "video" ? "video/*" : "image/*"}
                    onChange={handleFileChange}
                    className="w-full bg-white text-black px-3 py-2 rounded mb-2"
                />

                {uploading && (
                    <div className="mt-2 text-sm text-blue-400">
                        Uploading... {progress}%
                    </div>
                )}

                {error && (
                    <div className="mt-2 text-sm text-red-500">
                        {error}
                    </div>
                )}
            </div>

        </>
    );
};

export default FileUpload;