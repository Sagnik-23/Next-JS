export const VideoDisplay = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="w-full h-[30rem] aspect-video rounded-xl overflow-hidden border border-white/10 shadow-md bg-black">
      <video
        id="videoPlayer"
        className="w-full h-full object-contain rounded-xl"
        controls
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
