import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.inmateslogo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-[#B39600]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            natus doloribus. Aut voluptates veritatis delectus quod porro dolore
            animi, obcaecati quia ut iure velit tenetur eveniet officia deleniti
            consequuntur vero!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-[#B39600]">COMPANY</p>
          <ul className="flex flex-col gap-1 text-[#B39600]">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-[#B39600]">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-[#B39600]">
            <li>+91-3783748443</li>
            <li>inmate@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-[#B39600]">
          Copyright-2024@ imates.com - ALL Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
