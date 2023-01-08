import { useState, useEffect } from "react";
// import debounce from "../utils/debounce";
import debounce from "../utils/debounce.js";

const getDeviceConfig = (width: number): string => {
  if (width === 0 || width <= 600) {
    return "xs";
  } else if (width >= 600 && width <= 960) {
    return "sm";
  } else if (width >= 960 && width <= 1280) {
    return "md";
  } else if (width >= 1280 && width <= 1920) {
    return "lg";
  } else {
    return "xl";
  }
};

const getWindowDimensions = (): number => {
  const { innerWidth: width } = window;
  return width;
};

// Hook
const useBreakpoint = (): string => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [brkPnt, setBrkPnt] = useState(() =>
    getDeviceConfig(getWindowDimensions())
  );

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = debounce(() => {
      setBrkPnt(getDeviceConfig(getWindowDimensions()));
    }, 200);
    // debounce(() => {
    //   // Set window width/height to state

    // }, 200);
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return brkPnt;
};

export default useBreakpoint;
