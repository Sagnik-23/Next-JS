export type FileActions = {
    file: File;
    fileName: string;
    fileSize: number;
    from: string;
    fileType: string;
    isError?: boolean;
    url?: string;
    output?: any;
    outputBlob?: Blob;
}

export enum QualityType {
    High = "15",
    Medium = "18",
    Low = "20",
}

export enum VideoFormats {
    MP4 = "mp4",
    MKV = "mkv",
    AVI = "avi",
    MOV = "mov",
    FLV = "flv",
    WEBM = "webm",
}

export type VideoInputSettings = {
    quality: QualityType;
    videoType: VideoFormats;
    customEndTime: number;
    customStartTime: number;
    removeAudio: boolean;
    twitterCompressionComand: boolean;
    whatsappCompressionComand: boolean;
    duration: number; // Optional, used for trim functionality
}