
import React, { useRef, useEffect, useState } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({ audioSrc }) {
  //Ref to directly access the <audio> DOM element
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect that adds event listeners to the audio element //
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update isPlaying state on play and pause //
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Prompt user withconfirmation dialog boxif they try to close or reload //
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        // Prevent page unload when audio is playing //
        e.preventDefault();
        e.returnValue = ""; 
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  // Render audio element with controls and reference //
  return (
    <div className="audio-player">
      <audio controls src={audioSrc} ref={audioRef} />
    </div>
  );
}
