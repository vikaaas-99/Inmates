import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

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
            <img className="w-full h-auto" src={image} alt=""></img>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2  text-[#B39600]">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <i class="fa-solid fa-star text-[#B39600]"></i>
            <i class="fa-solid fa-star text-[#B39600]"></i>
            <i class="fa-solid fa-star text-[#B39600]"></i>
            <i class="fa-solid fa-star text-[#B39600]"></i>
            <i class="fa-solid fa-star text-[#B39600]"></i>
            <p className="pl-2 text-[#B39600]">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-[#B39600]">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-[#A20000] md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-[#B39600]">Select Size</p>
            <div className="flex gap-2">
              {productData.size.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-[#A20000] text-[#B39600] font-semibold ${
                    item === size ? "border-4 border-[#010097]" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-[#B39600]  px-8 py-3 text-sm border-2 border-[#A20000] active:bg-[#A20000]"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-[#B39600] mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Descripton and review */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm text-[#B39600]">Description</p>
          <p className="border px-5 py-3 text-sm text-[#B39600]">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-[#B39600]">
          <p className="text-[#B39600]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      ></RelatedProducts>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
