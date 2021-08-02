import Image from "next/image";

const Sidebar = ({ suggestions }) => {
  return (
    <div className="flex flex-1 h-screen overflow-hidden min-w-[56px] sm:w-1/4 xl:w-1/3 border-r-2 border-black">
      <div className="flex-col flex-1 w-full h-full min-h-full sm:overflow-y-scroll s remove-scrollbar ">
        {/*finerprint*/}
        <div className="flex-col flex-1 border-black border-b-1">
          <button className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </button>
          {/*following*/}
          <button className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {/*#*/}
          <button className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          {suggestions.map((suggestion) => {
            return (
              <button className="w-6 h-6 my-2 ">
                <Image
                  src={suggestion.profilePhoto.url}
                  alt={suggestion.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
