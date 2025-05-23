import React from "react";

const StarIcon = () => {
  return (
    <div className="text-yellow-500">
      {" "}
      {/* ✅ Controls fill color using Tailwind */}
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor" // ✅ Uses the color from the parent div
          d="M6.2545,14.7239l10.1213-.333L23.62,2.2815l1.5513-.0423-5.53,16.1977-9.1566.0191Z"
        />
        <path
          fill="currentColor"
          d="M10.41,37.4513l2.7189-9.7552L3.75,17.1527,4.1751,15.66,17.9677,25.7946l-2.7288,8.7406Z"
        />
        <path
          fill="currentColor"
          d="M32.3284,40.7692l-8.5851-5.3715L10.9745,41.4045l-1.3109-.8306,13.628-10.3555,7.6092,5.0935Z"
        />
        <path
          fill="currentColor"
          d="M41.8,20.15,34.147,26.7819l1.9973,13.9692-1.1787,1.01L29.0628,25.6953l7.1015-5.78Z"
        />
        <path
          fill="currentColor"
          d="M26.3227,4.6349l3.5854,9.4711,13.8007,2.9428.5412,1.4545H27.1345L24.1579,9.844Z"
        />
      </svg>
    </div>
  );
};

export default StarIcon;
