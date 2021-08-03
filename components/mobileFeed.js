import MobileVideo from "./mobileVideo";

const MobileFeed = ({ videos, sessionDispatch }) => {
  return (
    <div className="flex flex-col z-[-1] min-h-screen min-w-screen remove-scrollbar overflow-y-scroll overscroll-contain">
      {videos.map((video) => {
        return <MobileVideo data={video} sessionDispatch={sessionDispatch} />;
      })}
    </div>
  );
};

export default MobileFeed;
