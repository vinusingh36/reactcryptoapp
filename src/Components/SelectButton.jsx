import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Resize listener for responsiveness
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Breakpoints
  const isMobile = windowWidth < 480;
  const isTablet = windowWidth >= 480 && windowWidth < 768;
  const isDesktop = windowWidth >= 1024;

  // Base styles + responsive tweaks
  const baseStyle = {
    display: "inline-block",
    alignItems: "center",
    padding: isMobile ? "6px 10px" : isTablet ? "8px 14px" : "10px 18px", // desktop
    margin: "6px",
    border: "1px solid gold",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#f5f5f5",
    fontSize: isMobile ? "0.8rem" : isTablet ? "0.9rem" : "1rem", // desktop
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    userSelect: "none",
  };

  const selectedStyle = {
    backgroundColor: "gold",
    color: "black",
    // borderColor: "gold",
  };

  const hoverStyle = {
    backgroundColor: "gold",
    color: "black",
    // borderColor: "#1e88e5",
  };

  const combinedStyle = {
    ...baseStyle,
    ...(selected ? selectedStyle : {}),
    ...(isHovered && !selected ? hoverStyle : {}),
  };

  return (
    <span
      style={combinedStyle}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </span>
  );
};

export { SelectButton };
