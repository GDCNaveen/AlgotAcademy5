import React, { useRef, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface VideoPlayerProps {
  src: string;
  title: string;
  isVisible: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, isVisible }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isVisible && iframeRef.current) {
      // Pause video when not visible by reloading the iframe
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
  }, [isVisible]);

  // Handle orientation change for mobile fullscreen
  useEffect(() => {
    const handleOrientationChange = () => {
      if (Capacitor.isNativePlatform()) {
        const orientation = window.orientation;
        if (Math.abs(orientation) === 90) {
          // Landscape mode - enter fullscreen
          setIsFullscreen(true);
          if (iframeRef.current) {
            iframeRef.current.requestFullscreen?.();
          }
        } else {
          // Portrait mode - exit fullscreen
          setIsFullscreen(false);
          if (document.fullscreenElement) {
            document.exitFullscreen?.();
          }
        }
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  const enhancedSrc = `${src}&autoplay=0&loop=0&controls=1&fullscreen=1`;

  return (
    <div className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className="video-container">
        <iframe
          ref={iframeRef}
          src={enhancedSrc}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; accelerometer; gyroscope"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;