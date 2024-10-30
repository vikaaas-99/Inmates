import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={" Us"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.inmateslogo}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p className="text-[#B39600]">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </p>
          <p className="text-[#B39600]">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </p>
          <b className="text-[#A20000]">Our Mission</b>
          <p className="text-[#A20000]">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={" CHOOSE US"}></Title>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#B39600]">Quality Assurance:</b>
          <p className="text-[#B39600]">
            We meticulously select and vet each product to ensure it meets out
            stringest demands
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#B39600]">Convenience:</b>
          <p className="text-[#B39600]">
            We meticulously select and vet each product to ensure it meets out
            stringest demands
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#B39600]">Exceptional Customer Service:</b>
          <p className="text-[#B39600]">
            We meticulously select and vet each product to ensure it meets out
            stringest demands
          </p>
        </div>
      </div>
      {/* <NewsletterBox></NewsletterBox> */}
    </div>
  );
};

export default About;
