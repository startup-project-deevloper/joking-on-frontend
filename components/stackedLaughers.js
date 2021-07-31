const { useRef } = require("react");

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
                <img
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                ></img>
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
                <img
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                ></img>
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
                <img
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-maximum-red"
                  src={laugher.profilePhoto.url}
                  alt={laugher.username}
                ></img>
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
