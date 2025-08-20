'use client'
import VideoPlayer from "@/common/components/ui/video-playback";

const VideoPlaybackSection = () => {
  return (
    <VideoPlayer
      className="h-[800px]"
      posterSrc="https://images.unsplash.com/photo-1754671448143-8bd0bfb10bce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTF8fHxlbnwwfHx8fHw%3D"
      videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    />
  );
};

export default VideoPlaybackSection;