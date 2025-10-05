"use client";

import { useEffect, useState } from "react";

export default function BackgroundVideo() {
  const [isVideoDisabled, setIsVideoDisabled] = useState(true); // Start as true to prevent flash
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const videoDisabled = localStorage.getItem('videoDisabled') === 'true';
    setIsVideoDisabled(videoDisabled);
    setIsLoaded(true);
  }, []);

  // Don't render anything until we've checked localStorage
  if (!isLoaded || isVideoDisabled) {
    return null;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/crab_compressed.mp4" type="video/mp4" />
      <source src="/crab_compressed.mp4" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}