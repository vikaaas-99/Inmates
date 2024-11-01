import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font medium">
      <Link to={"/"}>
        <img src={assets.inmateslogo} style={{ height: "100px" }} alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-lg text-yellow-300">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 text-[#B39600]"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px]  hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 text-[#B39600]"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px]  hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 text-[#B39600]"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px]  hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 text-[#B39600]"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px]  hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <i
          onClick={() => setShowSearch(true)}
          className="fa-solid fa-magnifying-glass cursor-pointer text-[#B39600]"
        ></i>

        <div className="group relative">
          <i
            onClick={() => (token ? null : navigate("/login"))}
            className="fa-regular fa-user cursor-pointer text-[#B39600]"
          ></i>
          {/* dropdropdown */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 bg-black rounded">
                {/* <p className="cursor-pointer   text-[#B39600] hover:bg-[#010097]">
                  My Profile
                </p> */}
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer text-[#B39600] hover:bg-[#010097]"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer text-[#B39600] hover:bg-[#010097]"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <i className="fa-solid fa-cart-shopping text-[#B39600] cursor-pointer"></i>
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#B39600] text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <i
          onClick={() => setVisible(true)}
          className="fa-solid fa-bars text-[#B39600] cursor-pointer sm:hidden"
        ></i>
      </div>
      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-black transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-[#B39600]">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <i className="fa-solid fa-angle-down text-[#B39600] rotate-180"></i>
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 "
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 "
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 "
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 "
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
