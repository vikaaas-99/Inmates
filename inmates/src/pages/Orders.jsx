import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={" ORDERS"}></Title>
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items0start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium text-[#B39600]">
                  {item.name}
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-[#B39600]">
                  <p className=" text-[#B39600]">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-[#B39600]">Quantity: 1</p>
                  <p className="text-[#B39600]">M</p>
                </div>
                <p className="text-[#B39600] mt-2">
                  Date: <span className="text-[#B39600]">25,Jul,2204</span>{" "}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text:sm md:text-base text-green-500">
                  Ready to ship
                </p>
              </div>
              <button className="bg-[#A20000] text-[#B39600] px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
