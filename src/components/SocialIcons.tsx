import React from "react";
import { icons } from "../config/Constant";

const SocialIcons = () => {
  return (
    <div className="d-flex justify-content-center gap-3 mt-4">
      {icons?.map((item: any, index: any) => (
        <button key={index} aria-label={item.label} className="social-icon-btn">
          <item.Icon className="fs-5" />
        </button>
      ))}
    </div>
  );
};

export default SocialIcons;
