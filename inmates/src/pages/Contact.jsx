import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={" US"}></Title>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.asstss} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-[#B39600]">Our Store</p>
          <p className="text-[#B39600]">
            7834, Sector-33, Tanhguds <br /> Haryana, India{" "}
          </p>
          <p className="text-[#B39600]">
            Tel: +91-8485456432 <br />
            inmates@gmail.com
          </p>
          <p className="text-[#B39600]">Instagram</p>
        </div>
      </div>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default Contact;
