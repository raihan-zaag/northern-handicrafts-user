"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/common/lib/utils";

const VideoPlayer = ({ posterSrc, videoSrc, className, onPlay, onPause, ...props }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef(null);
    const hideControlsTimeoutRef = useRef(null);

    // Clear timeout on cleanup
    useEffect(() => {
        return () => {
            if (hideControlsTimeoutRef.current) {
                clearTimeout(hideControlsTimeoutRef.current);
            }
        };
    }, []);

    const hideControlsAfterDelay = () => {
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        hideControlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handlePlayPause = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            setShowControls(true);
            onPause && onPause();
        } else {
            videoRef.current.play();
            setIsPlaying(true);
            setShowControls(true);
            hideControlsAfterDelay();
            onPlay && onPlay();
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
    };

    const handleVideoClick = (e) => {
        e.preventDefault();
        if (isPlaying && !showControls) {
            setShowControls(true);
            hideControlsAfterDelay();
        }
    };

    return (
        <div
            className={cn(
                "relative w-full h-full bg-gray-100 overflow-hidden cursor-pointer",
                className
            )}
            onClick={handleVideoClick}
            {...props}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-fill"
                poster={posterSrc}
                onEnded={handleVideoEnded}
                onPlay={() => {
                    setIsPlaying(true);
                    hideControlsAfterDelay();
                }}
                onPause={() => {
                    setIsPlaying(false);
                    setShowControls(true);
                }}
                controls={false} // Always disable native controls
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Play / Pause Button Overlay */}
            {(!isPlaying || showControls) && (
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                        !isPlaying ? "bg-black/20" : "bg-transparent"
                    )}
                    onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                >
                    <button
                        className={cn(
                            "w-16 h-16 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center",
                            isPlaying && showControls && "bg-black/50 hover:bg-black/70 text-white"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause();
                        }}
                        type="button"
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8" fill="currentColor" />
                        ) : (
                            <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;