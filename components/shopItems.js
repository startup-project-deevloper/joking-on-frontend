import { useState, useEffect, useRef } from "react";

const ShopItems = () => {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [otherValue, setOtherValue] = useState(false);
  const [popularValue, setPopularValue] = useState(false);

  return (
    <div className="flex w-3/4 h-screen overflow-y-scroll bg-maximum-red xl:w-2/3 overscroll-contain style-scrollbar justify-items-center remove-scrollbar">
      <div className="flex flex-col items-center justify-center">
        <span>Items</span>
        <span>Items</span>
        <span>Items</span>
      </div>
    </div>
  );
};

export default ShopItems;
