import { useQuery } from "@apollo/client";
import FIND_VIDEO_QUERY from "../graphql/queries/findVideo";

import Video from "./video";
import Image from "next/image";
const tempVideo = [
  {
    laughers: [],
    publishedAt: "2021-08-01T16:00:00.000Z",
    owner: {
      addresses: [
        {
          isActive: true,
          publicKey: "0xc0b71AeAe2eae9EcB0ebDd5E1e14901127525709",
        },
      ],
      username: "unenunciate",
      profilePhoto: {
        url: "https://res.cloudinary.com/joking-on/image/upload/v1627719058/profile_936ca77835.jpg",
      },
    },
    description: "This is a sample video.",
    laughPoints: [],
    laughs: null,
    content: {
      url: "https://res.cloudinary.com/joking-on/video/upload/v1627820003/Stoner_Jokes_7e0c401d33.mp4",
    },
    views: null,
    comments: [],
    slug: "unenunciate",
    uid: "1",
  },
];

const Feed = ({ videos }) => {
  return (
    <div className="flex flex-col content-center w-full h-screen px-4 border-b-2 border-black sm:w-4/6">
      {tempVideo.map((video) => {
        return (
          <div key={video.uid} className="flex ">
            <div className="min-w-[72px] mr-4">
              <div className="min-w-[72px] flex justify-center p-2 mt-4 mr-4 rounded-full ">
                <Image
                  src={video.owner.profilePhoto.url}
                  alt={video.owner.username}
                  width={72}
                  height={72}
                  className="flex rounded-full min-w-[64px]"
                />
              </div>
            </div>
            <div className="pb-8">
              <div className="flex flex-col py-4">
                <div className="flex">
                  <h1 className="text-xl text-gray-900">
                    {video.owner.username}
                  </h1>
                </div>
                {video.owner.addresses.map((address) => {
                  if (address.isActive) {
                    return (
                      <h3 className="mt-2 text-xs text-gray-500 truncate w-52">
                        {address.publicKey}
                      </h3>
                    );
                  }
                })}
              </div>
              <Video data={video} />
            </div>

            <div className="flex flex-col justify-end h-full ml-2">
              <button className="p-2 mb-4 rounded-full bg-lemon-meringue hover:brightness-125 ring-2 ring-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 mb-12 rounded-full bg-lemon-meringue hover:brightness-125 ring-2 ring-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>

            <button className="w-16 h-8 px-4 rounded ring-orange ring bg-lemon-meringue text-orange hover:bg-orange hover:text-lemon-meringue active:brightness-125 translate-y-[12px] translate-x-[-1px]">
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;

/**
{
        username
        profilePhoto {
          url
        }
      }
      **/
