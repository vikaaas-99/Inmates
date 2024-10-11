import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font medium">
      <img src={assets.inmateslogo} style={{ height: "100px" }} alt="" />
      <ul className="hidden sm:flex gap-5 text-m text-yellow-300">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-300 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-300 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-300 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-300 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <i className="fa-solid fa-house"></i>
        <div className="group relative">
          <img
            className="w-6 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
