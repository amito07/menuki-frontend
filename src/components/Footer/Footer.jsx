import React from "react";

const Footer = () => {
  return (
    <div class="footer">
      <div class="contain">
        <div class="col">
          <h2>Company</h2>
          <ul>
            <li>About us</li>
            <li> Our Mission</li>
            <li>Services</li>
          </ul>
        </div>
        <div class="col">
          <h2>Contact</h2>
          <ul>
            <li>+91 9051 XXXXXX</li>
            <li>033 2464 XXXX</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
        <div class="col">
          <h2>Address </h2>
          <ul>
            <li>Sky Towers, Service Road, Kolkata</li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  );
};

export default Footer;
