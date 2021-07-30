import { useRef, useState, useEffect } from "react";

import { render, events } from "@react-three/fiber";

export default VR = ({ children }, ref) => {
  const [isActiveDisplay, setIsActiveDisplay] = useState(null);

  useEffect(() => {
    if (canvasRef.current.focus()) {
      setIsActiveDisplay(true);
    } else {
      setIsActiveDisplay(false);
    }

    console.log(isActiveDisplay);

    window.addEventListener("resize", () =>
      render(<mesh />, document.querySelector("canvas"), {
        events,
        size: { width: window.innerWidth, height: window.innerHeight },
      })
    );

    window.dispatchEvent(new Event("resize"));
  }, [setIsActiveDisplay]);

  return (
    <div className="absolute bg-maximum-red">
      <Canvas ref={ref}>
        <Cubes />
        <Lights />
        <Environment />
        {children}
      </Canvas>
    </div>
  );
};
