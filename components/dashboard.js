import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [collections, setCollections] = useState([]);
  const { user, logout, isUserLoggedIn, getToken } = useAuth();

  const [getCollections, { data, error, loading }] = useLazyQuery(
    GET_COLLECTIONS,
    {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    }
  );

  useEffect(() => {
    if (isUserLoggedIn && user.role.name === "Editor") {
      setCollections(getCollections());
    } else {
      //   Router.push("/");
    }
  }, [isUserLoggedIn, user]);

  return (
    <div className="flex justify-center h-screen min-w-full overflow-y-scroll bg-maximum-red overscroll-contain style-scrollbar justify-items-center remove-scrollbar">
      <div className="flex flex-col items-center justify-between py-44">
        <button class="px-8 py-2 bg-lemon-meringue text-black hover:bg-black hover:text-lemon-meringue rounded">
          Create NFT Collection
        </button>
        <button
          class={`px-8 py-2 bg-lemon-meringue text-black hover:bg-black hover:text-lemon-meringue rounded ${
            collections.length > 0 ? "brightness-50" : ""
          }`}
        >
          Create NFT
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
