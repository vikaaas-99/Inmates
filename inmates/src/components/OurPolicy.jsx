import React from "react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-[#B39600]">
      <div>
        <i className="fa-solid fa-arrow-right-arrow-left text-[#A20000] fa-2x"></i>

        <p className="font-semibold text-[#A20000]">Easy Exchange Policy</p>
        <p className="text-[#A20000]">We offer hassle free exchange policy</p>
      </div>
      <div>
        <i class="fa-solid fa-medal text-[#A20000] fa-2x"></i>
        <p className="font-semibold text-[#A20000]">7 Day Return Policy</p>
        <p className="text-[#A20000]">We offer 7 days free return policy</p>
      </div>
      <div>
        <i class="fa-solid fa-phone-volume text-[#A20000] fa-2x"></i>
        <p className="font-semibold text-[#A20000]">Best Customer Care</p>
        <p className="text-[#A20000]">We offer 24/7 Customer care</p>
      </div>
    </div>
  );
};

export default OurPolicy;
