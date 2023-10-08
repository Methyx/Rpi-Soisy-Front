import { useState, useEffect } from "react";

const getWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { width: windowSize.width, height: windowSize.height };
};

export default getWindowSize;
