import { useCallback, useEffect, useRef, useState } from "react";

const Video = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(false);
  const [volumeChanged, setVolumeChanged] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef(null);
  const volumeRef = useRef(null);

  const onVideoPress = useCallback(() => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  });

  const onVolumePress = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  });

  const onVolumeChange = useCallback((changedTo) => {
    if (isOpen) {
      document.addEventListener("mousedown", (event) => {
        if (!volumeRef.current?.contains(event.target)) {
          setIsOpen(false);
        }
      });
      videoRef.current.volume = changedTo;
      setVolume(changedTo);
      if (changedTo === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
      setVolumeChanged(true);
    }
  });

  useEffect(() => {
    if (volumeChanged) {
      document.removeEventListener("mousedown", (event) => {
        if (!volumeRef.current?.contains(event.target)) {
          setIsOpen(false);
        }
      });

      setVolumeChanged(false);
    }
  }, [volumeChanged]);

  return (
    <div className="relative remove-scrollbar">
      <video
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={data.content.url}
        className="flex z-[1] object-fill cursor-pointer bg-white rounded-2xl snap-start aspect-w-9 aspect-w-16 w-52 h-[30rem]"
      ></video>

      <button
        className="absolute z-[2] translate-x-3 -translate-y-8"
        onClick={() => onVideoPress()}
      >
        {!isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current text-lemon-meringue hover:brightness-125"
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
            className="w-5 h-5 fill-current text-lemon-meringue hover:brightness-125"
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
      </button>

      <button
        className="absolute z-[2] translate-x-12 -translate-y-8 "
        onClick={() => onVolumePress()}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current text-lemon-meringue hover:brightness-125"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current text-lemon-meringue hover:brightness-125"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/*for some reason this doesn't repaint the slider*/}
      <div className="absolute z-[2] translate-x-[4.5rem] -translate-y-8 ">
        {isOpen && (
          <section className="">
            <input
              ref={volumeRef}
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              defaultValue={1}
              onChange={(event) => onVolumeChange(event.target.valueAsNumber)}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Video;
