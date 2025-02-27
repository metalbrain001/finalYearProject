import React from "react";

const PlayIcon = () => {
  return (
    <div className="w-full">
      <svg
        height="100px"
        width="100px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <ellipse
          style={{ fill: "#E21B1B" }}
          cx="256"
          cy="256"
          rx="256"
          ry="255.832"
        />
        <polygon
          style={{ fill: "#00000A" }}
          points="173.328,403.248 416.976,256 173.328,108.752 "
        />
        <g style={{ opacity: "opacity:0.4" }}>
          <polygon
            style={{ fill: "#FFFFFF" }}
            points="173.328,256 416.976,256 173.328,108.752 	"
          />
        </g>
      </svg>
    </div>
  );
};

export default PlayIcon;
