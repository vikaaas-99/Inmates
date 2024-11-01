import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, fetchReviews, reviews, addReview } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // States for review system
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      fetchReviews(productId);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleReviewSubmit = () => {
    if (rating < 1 || rating > 5 || !reviewText) {
      alert("Please provide a valid rating and review.");
      return;
    }

    // Use the context addReview function to submit the review
    addReview(productId, rating, reviewText);

    // Reset rating and review text after submission
    setRating(0);
    setReviewText("");
  };

  // Function to calculate the average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Average rating rounded to 1 decimal
  };

  const averageRating = calculateAverageRating();

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-[#B39600]">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`fa-solid fa-star ${
                  index < averageRating ? "text-[#B39600]" : "text-gray-300"
                }`}
              ></i>
            ))}
            <p className="pl-2 text-[#B39600]">({reviews.length})</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-[#B39600]">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-[#A20000] md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="text-[#B39600]">Select sizes</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSizes(item)}
                  className={`border py-2 px-4 bg-[#A20000] text-[#B39600] font-semibold ${
                    item === sizes ? "border-4 border-[#010097]" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, sizes)}
            className="bg-black text-[#B39600] px-8 py-3 text-sm border-2 border-[#A20000] active:bg-[#A20000]"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Description and Review Tabs */}
      <div className="mt-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "description"
                ? "bg-[#B39600] text-white"
                : "text-[#B39600]"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "reviews"
                ? "bg-[#B39600] text-white"
                : "text-[#B39600]"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-[#B39600]">
          {activeTab === "description" ? (
            <p>{productData.description}</p>
          ) : (
            <div>
              <p>User reviews for this product:</p>
              {reviews.map((review, index) => (
                <div key={index} className="my-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <i
                        key={starIndex}
                        className={`fa-solid fa-star ${
                          starIndex < review.rating
                            ? "text-[#B39600]"
                            : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}

              {/* Review Input */}
              <div className="mt-4">
                <p className="font-medium">Leave a review:</p>
                <div className="flex gap-2 my-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <i
                      key={index}
                      onClick={() => setRating(index + 1)}
                      className={`fa-solid fa-star cursor-pointer ${
                        index < rating ? "text-[#B39600]" : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <textarea
                  className="border p-2 w-full"
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                ></textarea>
                <button
                  onClick={handleReviewSubmit}
                  className="mt-2 bg-[#A20000] text-white px-4 py-2"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart, fetchReviews, reviews, addReview } =
//     useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [sizes, setSizes] = useState("");
//   const [activeTab, setActiveTab] = useState("description");

//   // States for review system
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState([]);

//   const fetchProductData = async () => {
//     const product = products.find((item) => item._id === productId);
//     if (product) {
//       setProductData(product);
//       setImage(product.image[0]);
//       // Fetch reviews for the product using the context function
//       fetchReviews(productId);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   const handleReviewSubmit = () => {
//     if (rating < 1 || rating > 5 || !reviewText) {
//       alert("Please provide a valid rating and review.");
//       return;
//     }

//     // Use the context addReview function to submit the review
//     addReview(productId, rating, reviewText);

//     // Reset rating and review text after submission
//     setRating(0);
//     setReviewText("");
//   };

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2 text-[#B39600]">
//             {productData.name}
//           </h1>
//           <div className="flex items-center gap-1 mt-2">
//             {Array.from({ length: 5 }, (_, index) => (
//               <i
//                 key={index}
//                 className={`fa-solid fa-star ${
//                   index < productData.averageRating
//                     ? "text-[#B39600]"
//                     : "text-gray-300"
//                 }`}
//               ></i>
//             ))}
//             <p className="pl-2 text-[#B39600]">({reviews.length})</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium text-[#B39600]">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-[#A20000] md:w-4/5">
//             {productData.description}
//           </p>

//           <div className="flex flex-col gap-4 my-8">
//             <p className="text-[#B39600]">Select sizes</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSizes(item)}
//                   className={`border py-2 px-4 bg-[#A20000] text-[#B39600] font-semibold ${
//                     item === sizes ? "border-4 border-[#010097]" : ""
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => addToCart(productData._id, sizes)}
//             className="bg-black text-[#B39600] px-8 py-3 text-sm border-2 border-[#A20000] active:bg-[#A20000]"
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>

//       {/* Description and Review Tabs */}
//       <div className="mt-20">
//         <div className="flex">
//           <button
//             onClick={() => setActiveTab("description")}
//             className={`border px-5 py-3 text-sm ${
//               activeTab === "description"
//                 ? "bg-[#B39600] text-white"
//                 : "text-[#B39600]"
//             }`}
//           >
//             Description
//           </button>
//           <button
//             onClick={() => setActiveTab("reviews")}
//             className={`border px-5 py-3 text-sm ${
//               activeTab === "reviews"
//                 ? "bg-[#B39600] text-white"
//                 : "text-[#B39600]"
//             }`}
//           >
//             Reviews ({reviews.length})
//           </button>
//         </div>

//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-[#B39600]">
//           {activeTab === "description" ? (
//             <p>{productData.description}</p>
//           ) : (
//             <div>
//               <p>User reviews for this product:</p>
//               {reviews.map((review, index) => (
//                 <div key={index} className="my-3">
//                   <div className="flex items-center">
//                     {Array.from({ length: 5 }, (_, starIndex) => (
//                       <i
//                         key={starIndex}
//                         className={`fa-solid fa-star ${
//                           starIndex < review.rating
//                             ? "text-[#B39600]"
//                             : "text-gray-300"
//                         }`}
//                       ></i>
//                     ))}
//                   </div>
//                   <p>{review.comment}</p>
//                 </div>
//               ))}

//               {/* Review Input */}
//               <div className="mt-4">
//                 <p className="font-medium">Leave a review:</p>
//                 <div className="flex gap-2 my-2">
//                   {Array.from({ length: 5 }, (_, index) => (
//                     <i
//                       key={index}
//                       onClick={() => setRating(index + 1)}
//                       className={`fa-solid fa-star cursor-pointer ${
//                         index < rating ? "text-[#B39600]" : "text-gray-300"
//                       }`}
//                     ></i>
//                   ))}
//                 </div>
//                 <textarea
//                   className="border p-2 w-full"
//                   rows="4"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   placeholder="Write your review here..."
//                 ></textarea>
//                 <button
//                   onClick={handleReviewSubmit}
//                   className="mt-2 bg-[#A20000] text-white px-4 py-2"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [sizes, setSizes] = useState("");
//   const [activeTab, setActiveTab] = useState("description");

//   // States for review system
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([]); // Initialize with product reviews if available

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//         setReviews(item.reviews || []); // Initialize reviews if available
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   const handleReviewSubmit = () => {
//     if (rating < 1 || rating > 5 || !reviewText) {
//       alert("Please provide a valid rating and review.");
//       return;
//     }

//     const newReview = { rating, comment: reviewText };
//     setReviews([...reviews, newReview]);
//     setRating(0);
//     setReviewText("");
//   };

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2 text-[#B39600]">
//             {productData.name}
//           </h1>
//           <div className="flex items-center gap-1 mt-2">
//             {Array.from({ length: 5 }, (_, index) => (
//               <i
//                 key={index}
//                 className={`fa-solid fa-star ${
//                   index < productData.averageRating
//                     ? "text-[#B39600]"
//                     : "text-gray-300"
//                 }`}
//               ></i>
//             ))}
//             <p className="pl-2 text-[#B39600]">({reviews.length})</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium text-[#B39600]">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-[#A20000] md:w-4/5">
//             {productData.description}
//           </p>

//           <div className="flex flex-col gap-4 my-8">
//             <p className="text-[#B39600]">Select sizes</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSizes(item)}
//                   className={`border py-2 px-4 bg-[#A20000] text-[#B39600] font-semibold ${
//                     item === sizes ? "border-4 border-[#010097]" : ""
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => addToCart(productData._id, sizes)}
//             className="bg-black text-[#B39600] px-8 py-3 text-sm border-2 border-[#A20000] active:bg-[#A20000]"
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>

//       {/* Description and Review Tabs */}
//       <div className="mt-20">
//         <div className="flex">
//           <button
//             onClick={() => setActiveTab("description")}
//             className={`border px-5 py-3 text-sm ${
//               activeTab === "description"
//                 ? "bg-[#B39600] text-white"
//                 : "text-[#B39600]"
//             }`}
//           >
//             Description
//           </button>
//           <button
//             onClick={() => setActiveTab("reviews")}
//             className={`border px-5 py-3 text-sm ${
//               activeTab === "reviews"
//                 ? "bg-[#B39600] text-white"
//                 : "text-[#B39600]"
//             }`}
//           >
//             Reviews ({reviews.length})
//           </button>
//         </div>

//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-[#B39600]">
//           {activeTab === "description" ? (
//             <p>{productData.description}</p>
//           ) : (
//             <div>
//               <p>User reviews for this product:</p>
//               {reviews.map((review, index) => (
//                 <div key={index} className="my-3">
//                   <div className="flex items-center">
//                     {Array.from({ length: 5 }, (_, starIndex) => (
//                       <i
//                         key={starIndex}
//                         className={`fa-solid fa-star ${
//                           starIndex < review.rating
//                             ? "text-[#B39600]"
//                             : "text-gray-300"
//                         }`}
//                       ></i>
//                     ))}
//                   </div>
//                   <p>{review.comment}</p>
//                 </div>
//               ))}

//               {/* Review Input */}
//               <div className="mt-4">
//                 <p className="font-medium">Leave a review:</p>
//                 <div className="flex gap-2 my-2">
//                   {Array.from({ length: 5 }, (_, index) => (
//                     <i
//                       key={index}
//                       onClick={() => setRating(index + 1)}
//                       className={`fa-solid fa-star cursor-pointer ${
//                         index < rating ? "text-[#B39600]" : "text-gray-300"
//                       }`}
//                     ></i>
//                   ))}
//                 </div>
//                 <textarea
//                   className="border p-2 w-full"
//                   rows="4"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   placeholder="Write your review here..."
//                 ></textarea>
//                 <button
//                   onClick={handleReviewSubmit}
//                   className="mt-2 bg-[#A20000] text-white px-4 py-2"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;
