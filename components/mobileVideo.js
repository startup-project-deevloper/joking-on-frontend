import { useCallback, useRef, useState } from "react";

import Image from "next/image";

const MobileVideo = ({ data, sessionDispatch }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const onVideoPress = useCallback(() => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  });

  console.log(isPlaying);

  return (
    <div className="relative min-h-screen remove-scrollbar min-w-screen snap-start">
      <video
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={data.content.url}
        className="flex object-fill min-w-full min-h-screen bg-white cursor-pointer"
      ></video>

      <button
        className="absolute z-[2] top-1/2 left-1/2"
        onClick={() => onVideoPress()}
      >
        {isPlaying ? (
          <div></div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 fill-current text-lemon-meringue hover:brightness-125"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <button
        className="absolute z-[2] bottom-32 right-2"
        onClick={() => onVideoPress()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 fill-current text-lemon-meringue hover:brightness-125"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        className="absolute z-[2] bottom-52 right-2"
        onClick={() => onVideoPress()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 fill-current text-lemon-meringue hover:brightness-125"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>

      <button
        className="absolute z-[2] bottom-72 right-2 hover:brightness-125"
        onClick={() => onVideoPress()}
      >
        <Image
          src={data.owner.profilePhoto.url}
          width={44}
          height={44}
          layout="fixed"
          className="rounded-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-5 w-5 z-[3] bottom-0 right-3 fill-current text-maximum-red ring-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`${
          data.userLaughedAt || session.userLaughedAt
            ? "text-maximum-red"
            : "text-black"
        } absolute z-[2] bottom-12 right-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          enable-background="new 0 0 64 64"
          className
        >
          <path d="m62 32c0-16.57-13.43-30-30-30-16.57 0-30 13.43-30 30 0 2.49.309 4.907.88 7.221-2.49 4.892.696 10.032 5.058 10.699 5.469 7.332 14.211 12.08 24.062 12.08 9.853 0 18.593-4.748 24.062-12.08 4.361-.668 7.545-5.807 5.057-10.697.572-2.315.881-4.732.881-7.223m-30-27.5c15.164 0 27.5 12.336 27.5 27.5 0 1.552-.135 3.071-.383 4.553-5.41-5.293-15.186-5.543-15.186-5.543s.029 1.197.264 2.996c-11.189 0-13.201 0-24.392 0 .236-1.799.264-2.996.264-2.996s-9.771.25-15.183 5.543c-.248-1.483-.384-3.002-.384-4.553 0-15.164 12.337-27.5 27.5-27.5m-13.501 35.5c.443-1.395.762-2.765.99-4 11.787 0 13.236 0 25.021 0 .229 1.235.549 2.605.99 4-9.299 0-17.703 0-27.001 0m21.214 10.664c-2.229.957-4.799 1.518-7.712 1.518-2.914 0-5.484-.561-7.713-1.518 2.152-1.031 4.711-1.662 7.713-1.662 3.001 0 5.562.631 7.712 1.662m-7.713 8.836c-8.443 0-16.007-3.828-21.056-9.836 1.195-.396 2.401-1.152 3.543-2.354.326-.342.632-.704.92-1.08 2.815 4.206 8.185 7.77 16.593 7.77 8.406 0 13.777-3.563 16.591-7.769.289.376.594.737.918 1.079 1.145 1.201 2.352 1.959 3.547 2.354-5.048 6.008-12.613 9.836-21.056 9.836" />
          <path d="m14.858 29.607c1.802-1.901 3.957-2.658 6.207-2.658s4.404.757 6.207 2.658c.479.505 1.438-.424 1.254-.938-1.859-5.111-4.66-7.669-7.461-7.669-2.801 0-5.602 2.558-7.46 7.669-.184.515.774 1.443 1.253.938" />
          <path d="m36.727 29.607c1.803-1.901 3.957-2.658 6.207-2.658s4.404.757 6.207 2.658c.479.505 1.438-.424 1.254-.938-1.86-5.111-4.661-7.669-7.461-7.669s-5.602 2.558-7.461 7.669c-.184.515.775 1.443 1.254.938" />
        </svg>
      </div>

      <div className="absolute z-[2] text-lemon-meringue  bottom-32 left-4 min-w-2/3">
        <div className="flex">
          <div className="pr-2">{`@${data.owner.username} `}</div>
          <div>
            {data.owner.isComedian ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-current text-maximum-red"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>{data.description}</div>
        <div className="flex justify-around">
          {data.tags.map((tag) => (
            <div className="flex px-2">{` #${tag.content} `}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileVideo;
