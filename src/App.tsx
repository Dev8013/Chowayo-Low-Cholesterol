/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Using a more reliable sample video URL
  const videoSrc = '/video.mp4';
  const gifFallback = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6fG9S01G/giphy.gif';

  const handleTrigger = (e: React.MouseEvent) => {
    if (e.button === 0 && !isPlaying) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Video play failed:", err);
            // If video fails, we still want to reset the state after a timeout
            setTimeout(() => setIsPlaying(false), 2000);
          });
        }
      } else {
        setTimeout(() => setIsPlaying(false), 2000);
      }
    }
  };

  useEffect(() => {
    if (isPlaying && videoError) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, videoError]);

  const onVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="relative w-screen h-screen bg-bg flex flex-col justify-center items-center border-[20px] border-bg outline-1 outline-white/10 -outline-offset-[10px] overflow-hidden select-none"
      onMouseDown={handleTrigger}
    >
      {/* Media Container (Full Screen) */}
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden bg-black">
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={onVideoEnd}
            playsInline
            muted
            preload="auto"
            onError={() => {
              console.error("Video element error, switching to GIF fallback");
              setVideoError(true);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={gifFallback}
            alt="Impact Visual"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Frame Overlay */}
      <div className="absolute inset-[40px] border-x border-white/10 pointer-events-none z-20" />

      {/* Visual Glitch Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-accent mix-blend-overlay pointer-events-none animate-flash z-40"
          />
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-10 text-[10px] uppercase tracking-widest opacity-50 z-30">
        <span>Ref: X-9021</span>
        <span>Status: {isPlaying ? 'Active' : 'Ready'}</span>
        <span>Frame: {isPlaying ? '001/600' : '000/000'}</span>
      </div>
    </div>
  );
}
