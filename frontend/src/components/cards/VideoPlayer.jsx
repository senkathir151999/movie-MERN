import { useEffect, useRef, useState } from "react";
import "./videoPlayer.css";
import videoFile from "../../assets/file_example_MP4_480_1_5MG.mp4";
function VideoPlayer({ isPlaying }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef?.current?.paused && isPlaying) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
       
        src={videoFile}
        type="video/mp4"
      ></video>
    </div>
  );
}

export default VideoPlayer;
