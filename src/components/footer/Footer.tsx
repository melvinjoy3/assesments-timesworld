import React from "react";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  return (
    <div>
      <SocialIcons />
      <div className="d-flex flex-column align-items-center mt-4">
        <span>Example@email.com</span>
        <span>Copyright © 2020 Name. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
