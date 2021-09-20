import { useReducer, useState, useEffect } from "react";

function collectablesReducer(state, action) {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        filters: [...state.filters, action.payload],
      };
    case "REMOVE_FILTER":
      return {
        filters: state.filters.filter((filter) => filter !== action.payload),
      };
    case "CLEAR_FILTERS":
      return {
        filters: [],
      };
    default:
      return state;
  }
}

const ShopFilter = () => {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [otherValue, setOtherValue] = useState(false);
  const [popularValue, setPopularValue] = useState(false);

  return (
    <div className="flex min-w-[256px] sm:w-1/4 h-screen overflow-y-scroll border-r-2 border-black xl:w-1/3 overscroll-contain style-scrollbar justify-items-center remove-scrollbar">
      <div className="flex flex-col items-center w-full mt-8">
        <div className="flex flex-col items-center justify-center pb-1 space-y-2">
          <button className="flex items-center justify-between w-2/3 px-4 py-2 space-x-2 rounded hover:bg-lemon-meringue md:w-full">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>Jokes</span>
          </button>
          <button className="flex items-center justify-between w-2/3 px-4 py-2 space-x-2 rounded hover:bg-lemon-meringue md:w-full">
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Tickets</span>
          </button>
          <button className="flex items-center justify-between w-2/3 px-4 py-2 space-x-2 rounded hover:bg-lemon-meringue md:w-full">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Merch</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full pb-1">
          <div className="flex flex-col w-2/3 border-t-2 border-b-2 border-black">
            <span className="w-full text-center">Filter by:</span>
            <form>
              <div className="flex flex-col items-center w-full">
                <label class="flex w-2/3 justify-between px-1 items-center py-1 hover:bg-lemon-meringue rounded">
                  <input
                    checked={otherValue}
                    onChange={() => {
                      const temp =
                        selectedVariants.filter(
                          (variant) => variant.key === "Other"
                        ).length === 1
                          ? [
                              ...selectedVariants.filter(
                                (variant) => variant.key !== "Other"
                              ),
                            ]
                          : [
                              ...selectedVariants,
                              {
                                key: "Other",
                                value: "Other",
                              },
                            ];
                      setSelectedVariants(temp);

                      setOtherValue(!otherValue);
                    }}
                    type="checkbox"
                  />
                  <span class="text-lg">Other</span>
                </label>
                <label class="flex w-2/3 justify-between px-1 items-center py-1 hover:bg-lemon-meringue rounded">
                  <input
                    checked={popularValue}
                    onChange={() => {
                      const temp =
                        selectedVariants.filter(
                          (variant) => variant.key === "Popular"
                        ).length === 1
                          ? [
                              ...selectedVariants.filter(
                                (variant) => variant.key !== "Popular"
                              ),
                            ]
                          : [
                              ...selectedVariants,
                              {
                                key: "Popular",
                                value: "Popular",
                              },
                            ];
                      setSelectedVariants(temp);

                      setPopularValue(!popularValue);
                    }}
                    type="checkbox"
                  />
                  <span class="text-lg">Popular</span>
                </label>
                <div class="flex flex-col text-gray-900 text-3xl items-center">
                  <span>Output:</span>
                  {console.log("Output", selectedVariants)}
                  {selectedVariants.map((variant, index) => (
                    <div className="flex flex-col">
                      <span>
                        {variant.key === "Other"
                          ? variant.value
                          : `null ${index}`}
                      </span>
                      <span>
                        {variant.key === "Popular"
                          ? variant.value
                          : `null ${index}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
