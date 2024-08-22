import React, { useState, useEffect, useRef } from 'react';

interface LazyVideoProps {
  videoSrc: string;
  className?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({ videoSrc, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoadVideo(true); // Load the video when it's about to come into view
          } else {
            setLoadVideo(false); // Unload the video when it goes out of view
          }
        });
      },
      {
        threshold: 0, // Trigger when 10% of the video is visible
        rootMargin: '500px 0px 500px 0px' // Check for intersection 500px before and after the video element
      }
    );

    const videoElement = videoRef.current;

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  useEffect(() => {
    if (loadVideo && videoRef.current) {
      videoRef.current.src = videoSrc; // Load the video by setting the src
    } else if (videoRef.current) {
      videoRef.current.src = ""; // Clear the source when not needed
      videoRef.current.load(); // Force reload to clear buffered data
    }
  }, [loadVideo, videoSrc]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default LazyVideo;
