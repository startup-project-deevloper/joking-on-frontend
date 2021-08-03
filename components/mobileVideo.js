import { useCallback, useRef, useState } from "react";

import Image from "next/image";

const MobileVideo = ({ data }) => {
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
      <div className="flex justify-center min-w-full text-lemon-meringue">
        <div className="absolute ">
          <button className="px-4 mr-2 ">Following</button>
          <button className="px-4 ml-2  ">For You</button>
        </div>
      </div>
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
        className="absolute z-[2] bottom-52 right-2"
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
