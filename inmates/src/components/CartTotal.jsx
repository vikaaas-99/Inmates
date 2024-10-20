import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={" TOTALS"}></Title>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm text-[#B39600]">
        <div className="flex justify-between">
          <p className="text-[#B39600]">Subtotal</p>
          <p className="text-[#B39600]">
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="text-[#B39600]">Shipping Fee</p>
          <p className="text-[#B39600]">
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b className="text-[#B39600]">Total</b>
          <b className="text-[#B39600]">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
