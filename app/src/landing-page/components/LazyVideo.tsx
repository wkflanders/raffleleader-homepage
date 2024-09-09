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
            setLoadVideo(true);
          }
        });
      },
      {
        rootMargin: '1000px 0px',
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
      videoRef.current.src = videoSrc;
      videoRef.current.load(); // Start loading the video immediately
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
      preload="auto" // Preload only the metadata initially
    />
  );
};

export default LazyVideo;
