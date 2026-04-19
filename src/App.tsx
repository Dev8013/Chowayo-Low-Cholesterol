/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const videoSrc = '/video.mp4';
  const audioSrc = '/sound.mp3';
  const audioFallback = 'https://assets.mixkit.co/sfx/preview/mixkit-simple-click-select-1879.mp3';
  const gifFallback = 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop';

  const handleTrigger = (e: React.MouseEvent) => {
    if (e.button === 0 && !isPlaying) {
      setIsPlaying(true);
      
      // Play Audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.error("Audio play failed, trying fallback:", err);
          const fallbackAudio = new Audio(audioFallback);
          fallbackAudio.play().catch(e => console.error("Audio fallback failed:", e));
        });
      }

      // Play Video
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
            autoPlay={false}
            preload="metadata"
            src={videoSrc}
            onError={(e) => {
              const video = e.currentTarget;
              const err = video.error;
              let msg = 'Unknown Error';
              if (err) {
                switch (err.code) {
                  case 1: msg = 'Aborted'; break;
                  case 2: msg = 'Network Error'; break;
                  case 3: msg = 'Decode Error'; break;
                  case 4: msg = 'Source Not Supported'; break;
                }
              }
              setErrorDetail(msg);
              console.error("Video element error:", msg, err);
              setVideoError(true);
            }}
          >
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

      {/* Status Bar */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
        <div className="flex gap-10 text-[10px] uppercase tracking-widest opacity-50">
          <span>Ref: X-9021</span>
          <span>Status: {isPlaying ? 'Active' : 'Ready'}</span>
          <span>Frame: {isPlaying ? '001/600' : '000/000'}</span>
        </div>
        {videoError && (
          <div className="text-[8px] text-red-500 uppercase tracking-tighter opacity-80">
            Playback Error: {errorDetail || 'Check Assets'}
          </div>
        )}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
}
