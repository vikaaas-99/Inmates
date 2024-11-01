import React from "react";
import { assets } from "../assets/assets"; // Ensure the path is correct

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border ">
      {/* Hero left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#B39600]">
          {/* Section for "OUR BESTSELLER" */}
          <div className="flex items-center gap-2 mb-3">
            <p className="w-8 md:w-11 h-[2px] bg-[#B39600]"></p>
            <p className="font-semibold font-medium text-sm md:text-base text-[#B39600]">
              OUR BESTSELLER
            </p>
          </div>

          {/* Heading for "Latest Arrivals" */}
          <h1 className="prata-regular  text-3xl sm:py-3 text-5xl leading-relaxed text-[#B39600]">
            Latest <span className="text-[#A20000]">Arrivals</span>
          </h1>

          {/* Section for "SHOP NOW" with line */}
          <div className="flex items-center gap-2 mt-5">
            {/* Line after "SHOP NOW" */}
            <p className="font-semibold text-sm md:text-base text-[#B39600] cursor-pointer">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#B39600]"></p>{" "}
          </div>
        </div>
      </div>
      {/* Hero RightSide */}
      <img className="w-full sm:w-1/2" src={assets.hero_home} alt="" />
    </div>
  );
};

export default Hero;

// original code
// import React from "react";

// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-[#B39600]">
//       {/* Hero left */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div className="text-[#B39600]">
//           <div className="flex item-center gap-2">
//             <p className="w-8 md:w-11 h-[2px] bg-black"></p>
//             <p className="font-medium text-sm md:text-base text-[#B39600]">
//               OUR BESTSELLER
//             </p>
//           </div>
//           <h1 className="text-3xl sm:py-3 text-5xl leading-relaxed text-[#B39600]">
//             Latest Arrivals
//           </h1>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base text-[#B39600]">
//               <p className="w-8 md:w-11 h-[2px] bg-black"></p>
//               SHOP NOW
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
