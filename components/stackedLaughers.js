import { useRef } from "react";

import { fromPairs } from "lodash";
import Image from "next/image";

const StakedLaughers = ({ size, max, laughers }) => {
  const count = useRef(0);

  switch (size) {
    case SMALL:
      return (
        <div class="flex -space-x-1 overflow-hidden">
          {laughers.map((laugher) => {
            if (count.current < max) {
              count.current++;
              return (
                <Image
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                  width={24}
                  height={24}
                ></Image>
              );
            }
          })}
        </div>
      );
    case MEDIUM:
      return (
        <div class="flex -space-x-2 overflow-hidden">
          {laughers.map((laugher) => {
            if (count.current < max) {
              count.current++;
              return (
                <Image
                  className="inline-block w-8 h-8 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                  width={32}
                  height={32}
                ></Image>
              );
            }
          })}
        </div>
      );
    case LARGE:
      return (
        <div class="flex -space-x-3 overflow-hidden">
          {laughers.map((laugher) => {
            if (count.current < max) {
              count.current++;
              return (
                <Image
                  className="inline-block w-10 h-10 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                  width={40}
                  height={40}
                ></Image>
              );
            }
          })}
        </div>
      );
    default:
      return new Error();
  }
};

export default StakedLaughers;
