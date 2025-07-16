import { getFileExtension } from "./convert"
import { VideoFormats, VideoInputSettings } from "./types"

export const whatsappCompressionCommand = (input: string, output: string) => [
    "-i", input, "-c:v", "libx264", "-preset", "veryfast", "-crf", "35", "-c:a", "aac", "-b:a", "64k", "-movflags", "faststart", "-maxrate", "1000k", "-bufsize", "1000k", "-fs", "9M", output
]

export const twitterCompressionCommand = (input: string, output: string) => [
    "-i", input, "-c:v", "libx264", "-profile:v", "high", "-level:v", "4.2", "-pix_fmt", "yuv420p", "-r", "30", "-c:a", "aac", "-b:a", "192k", "-movflags", "faststart", "-maxrate", "5000k", "-bufsize", "5000k", "-tune", "film", output
]

export const customCompressionCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const inputType = getFileExtension(input);
    if (inputType === "mp4") {
        return getMP4toMP4commands(input, output, videoSettings);
    } else {
        switch (videoSettings.videoType) {
            case VideoFormats.MP4:
                return getMP4commands(input, output, videoSettings);
            case VideoFormats.WEBM:
                return getWebMcommands(input, output, videoSettings);
            case VideoFormats.MKV:
                return getMKVcommands(input, output, videoSettings);
            default:
                return ["-i", input, output]
        }
    }
}

const getMP4toMP4commands = (
  input: string,
  output: string,
  videoSettings: VideoInputSettings
): string[] => {
  const ffmpegCommand = [
    "-y", // force overwrite (optional)
    "-i", input,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-pix_fmt", "yuv420p",
    "-movflags", "faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    "-f", "mp4",
  ];

  // Add trimming if specified
  if (
    typeof videoSettings.customStartTime === "number" &&
    typeof videoSettings.customEndTime === "number" &&
    videoSettings.customEndTime > videoSettings.customStartTime
  ) {
    ffmpegCommand.push(
      "-ss", videoSettings.customStartTime.toString(),
      "-to", videoSettings.customEndTime.toString()
    );
  }

  ffmpegCommand.push(output);

  return ffmpegCommand;
};


const getMP4commands = (input: string, output: string, videoSettings: VideoInputSettings) => {
    const ffmpegComand = [
        "-i", input,
        "-c:v", "libx264",
        "-profile:v", "high",
        "-level:v", "4.2",
        "-pix_fmt", "yuv420p",
        "-r", "30",
        "-maxrate", "5000k",
        "-bufsize", "5000k",
        "-tune", "film",
        "-ss", videoSettings.customStartTime.toString(),
        "-to", videoSettings.customEndTime.toString(),
        "-q:v", videoSettings.quality,
        "-preset", "medium",
        "-c:v", "libx264",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "faststart",
        "-f", videoSettings.videoType.toLowerCase(),
        output
    ]

    return ffmpegComand;
}
const getWebMcommands = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
): string[] => {
    return [
        "-i", input,
        "-c:v", "libvpx-vp9",
        "-b:v", "1M",
        "-c:a", "libopus",
        "-ss", videoSettings.customStartTime.toString(),
        "-to", videoSettings.customEndTime.toString(),
        "-crf", "30",
        "-preset", "good",
        "-threads", "4",
        "-f", "webm",
        output
    ];
};

const getMKVcommands = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
): string[] => {
    return [
        "-i", input,
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        "-ss", videoSettings.customStartTime.toString(),
        "-to", videoSettings.customEndTime.toString(),
        "-f", "matroska",
        output
    ];
};
