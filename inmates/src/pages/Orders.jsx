import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={" ORDERS"}></Title>
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium text-[#B39600]">
                  {item.name}
                </p>
                <div className="flex items-center gap-3 mt-1 text-base text-[#B39600]">
                  <p className=" text-[#B39600]">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-[#B39600]">Quantity: {item.quantity}</p>
                  <p className="text-[#B39600]">Size: {item.size}</p>
                </div>
                <p className="text-[#B39600] mt-1">
                  Date:{" "}
                  <span className="text-[#B39600]">
                    {new Date(item.date).toDateString()}
                  </span>{" "}
                </p>
                <p className="text-[#B39600] mt-1">
                  Payment:{" "}
                  <span className="text-[#B39600]">{item.paymentMethod}</span>{" "}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text:sm md:text-base text-green-500">
                  {item.status}
                </p>
              </div>
              <button
                onClick={loadOrderData}
                className="bg-[#A20000] text-[#B39600] px-4 py-2 text-sm font-medium rounded-sm"
              >
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
