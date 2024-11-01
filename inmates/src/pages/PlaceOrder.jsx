import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));

    if (name === "zipcode" && value.length === 6) {
      // Validate pincode when it has 6 digits
      validatePincode(value);
    }
  };

  // Pincode validation function
  const validatePincode = async (pincode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data;
      if (data[0].Status === "Success") {
        setIsPincodeValid(true);
      } else {
        setIsPincodeValid(false);
        toast.error("Invalid pincode. Please enter a valid one.");
      }
    } catch (error) {
      console.log(error);
      setIsPincodeValid(false);
      toast.error("Error validating pincode.");
    }
  };

  //razorpay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isPincodeValid) {
      toast.error("Please enter a valid pincode to place your order.");
      return;
    }
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        //cc
        // case "ccavenue":
        //   const responseCCAvenue = await axios.post(
        //     backendUrl + "/api/order/ccavenue",
        //     orderData,
        //     { headers: { token } }
        //   );
        //   if (responseCCAvenue.data.success) {
        //     const { ccavenue_url } = responseCCAvenue.data;
        //     window.location.replace(ccavenue_url);
        //   } else {
        //     toast.error(responseCCAvenue.data.message);
        //   }
        //   break;
        case "ccavenue":
          try {
            const responseCCAvenue = await axios.post(
              backendUrl + "/api/order/placeOrderCcavenue", // Ensure this matches your backend route
              orderData,
              { headers: { token } }
            );

            if (responseCCAvenue.data.success) {
              const { paymentUrl } = responseCCAvenue.data; // Use the correct key from the response
              window.location.replace(paymentUrl); // Redirect to CCAvenue payment page
            } else {
              toast.error(responseCCAvenue.data.message);
            }
          } catch (error) {
            console.error("Payment request failed:", error);
            toast.error("An error occurred while processing your payment."); // Handle errors gracefully
          }
          break;

        //
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={" INFORMATION"}></Title>
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal></CartTotal>
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={" METHOD"}></Title>
          {/* Payment Method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* <div
              onClick={() => setMethod("stripe")}
              className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-[#A20000]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div> */}
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-[#A20000]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div> */}

            <div
              onClick={() => setMethod("ccavenue")}
              className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "ccavenue" ? "bg-[#A20000]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.ccavenue_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-[#A20000]" : ""
                }`}
              ></p>
              <p className="text-[#B39600] text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#A20000] text-[#B39600] px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

// // import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//   } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   //razorpay
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Order",
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         console.log(response);
//         try {
//           const { data } = await axios.post(
//             backendUrl + "/api/order/verifyRazorpay",
//             response,
//             { headers: { token } }
//           );
//           if (data.success) {
//             navigate("/orders");
//             setCartItems({});
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error(error);
//         }
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(
//               products.find((product) => product._id === items)
//             );
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       console.log(orderItems);
//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       };
//       switch (method) {
//         // API CALLS for COD
//         case "cod":
//           const response = await axios.post(
//             backendUrl + "/api/order/place",
//             orderData,
//             { headers: { token } }
//           );
//           if (response.data.success) {
//             setCartItems({});
//             navigate("/orders");
//           } else {
//             toast.error(response.data.message);
//           }
//           break;
//         case "stripe":
//           const responseStripe = await axios.post(
//             backendUrl + "/api/order/stripe",
//             orderData,
//             { headers: { token } }
//           );
//           if (responseStripe.data.success) {
//             const { session_url } = responseStripe.data;
//             window.location.replace(session_url);
//           } else {
//             toast.error(responseStripe.data.message);
//           }
//           break;
//         case "razorpay":
//           const responseRazorpay = await axios(
//             backendUrl + "/api/order/razorpay",
//             orderData,
//             { headers: { token } }
//           );
//           if (responseRazorpay.data.success) {
//             initPay(responseRazorpay.data.order);
//           }
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
//     >
//       {/* Left Side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={"DELIVERY"} text2={" INFORMATION"}></Title>
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="firstName"
//             value={formData.firstName}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="lastName"
//             value={formData.lastName}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="text"
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="email"
//           value={formData.email}
//           className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           onChange={onChangeHandler}
//           name="street"
//           value={formData.street}
//           className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//           type="text"
//           placeholder="Street"
//         />
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="city"
//             value={formData.city}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="state"
//             value={formData.state}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="zipcode"
//             value={formData.zipcode}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="number"
//             placeholder="Zipcode"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="country"
//             value={formData.country}
//             className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="phone"
//           value={formData.phone}
//           className="border rounded py-1.5 px-3.5 w-full text-[#B39600]"
//           type="number"
//           placeholder="Phone"
//         />
//       </div>
//       {/* Right Side */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal></CartTotal>
//         </div>
//         <div className="mt-12">
//           <Title text1={"Payment"} text2={" METHOD"}></Title>
//           {/* Payment Method */}
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod("stripe")}
//               className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={min-w-3.5 h-3.5 border rounded-full ${
//                   method === "stripe" ? "bg-[#A20000]" : ""
//                 }}
//               ></p>
//               <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
//             </div>
//             <div
//               onClick={() => setMethod("razorpay")}
//               className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={min-w-3.5 h-3.5 border rounded-full ${
//                   method === "razorpay" ? "bg-[#A20000]" : ""
//                 }}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
//             </div>
//             <div
//               onClick={() => setMethod("cod")}
//               className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-[#A20000]" : ""
//                 }}
//               ></p>
//               <p className="text-[#B39600] text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>
//           <div className="w-full text-end mt-8">
//             <button
//               type="submit"
//               // onClick={() => navigate("/orders")}
//               className="bg-[#A20000] text-[#B39600] px-16 py-3 text-sm"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
