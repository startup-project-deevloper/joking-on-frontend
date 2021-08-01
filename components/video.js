import { useCallback, useRef, useState } from "react";

import { PLAY, PAUSE } from "../constrants";

const Video = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const onVideoPress = useCallback((event) => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  });

  return (
    <div className="remove-scrollbar">
      <video
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={data.content.url}
        className="relative z-10 object-fill w-full bg-white rounded-2xl snap-start aspect-w-9 aspect-w-16 h- h-[30rem]"
      ></video>
      {!isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="z-20 flex w-5 h-5 text-white fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="z-20 flex w-5 h-5 text-white fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default Video;
