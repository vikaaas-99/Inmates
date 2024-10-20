import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-t border-b bg-black text-center text-[#B39600]">
      <div className="inline-flex item-center justify-center border px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <i className="fa-solid fa-magnifying-glass text-[#B39600]"></i>
      </div>
      <i
        onClick={() => setShowSearch(false)}
        className="fa-solid fa-xmark text-[#B39600] inline cursor-pointer"
      ></i>
    </div>
  ) : null;
};

export default SearchBar;
