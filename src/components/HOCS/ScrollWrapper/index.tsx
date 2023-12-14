import React, { useState, useEffect, ReactNode } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to handle the scroll event
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // Add and remove the scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine the classes based on scroll position
  const dynamicClasses =
    scrollPosition > 80
      ? "scale-100 top-0 fixed right-0 bg-[rgb(40,40,40)] z-[1000] min-w-[360px]"
      : "scale-100 relative";

  return <div className={`transition-all ${dynamicClasses}`}>{children}</div>;
};

export default ScrollWrapper;
