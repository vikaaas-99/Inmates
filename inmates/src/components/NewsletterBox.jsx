import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-[#A20000]">
        Subscribe now to get the latest updates about the new products we launch
      </p>
      <p className="text-[#010097]">Dummy Text</p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md">
        <input
          className="w-full sm:flex-1 outline-none py-2 px-3"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-[#010097] text-[#B39600] py-2 px-4 rounded-md hover:bg-[#0100D7] transition duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
