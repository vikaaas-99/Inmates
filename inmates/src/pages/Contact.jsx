import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
// import NewsletterBox from "../components/NewsletterBox";

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

      {/* FAQ Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Frequently Asked"} text2={" Questions (FAQ)"}></Title>
      </div>
      <div className="my-10 px-4 md:px-0 flex flex-col items-center">
        <div className="mt-4 text-left">
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              1. How do I place an order?
            </h4>
            <p className="text-[#B39600]">
              To place an order, simply select your desired item, choose the
              correct size, and click "Add to Cart." When you're ready, proceed
              to checkout and complete the payment process. You'll receive a
              confirmation email once your order is successfully placed.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              2. What payment methods do you accept?
            </h4>
            <p className="text-[#B39600]">
              We accept various online payment options, including credit and
              debit cards, UPI, net banking, and popular digital wallets. Please
              note that we do not offer Cash on Delivery (COD).
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              3. Can I cancel or modify my order after placing it?
            </h4>
            <p className="text-[#B39600]">
              Once an order is placed, it is processed quickly to ensure fast
              dispatch, so cancellations or modifications are typically not
              possible. However, if there’s an urgent change, please reach out
              to us immediately at inmatess.xyz@gmail.com, and we’ll do our best
              to assist.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              4. How soon will my order be shipped?
            </h4>
            <p className="text-[#B39600]">
              All orders are dispatched within 24 hours after they are placed.
              You will receive a tracking number via email once your order is
              shipped, allowing you to monitor its delivery status.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              5. What is your return and exchange policy?
            </h4>
            <p className="text-[#B39600]">
              We have a no return and exchange policy. All sales are final.
              However, if there’s an issue with your order, such as a defect or
              incorrect item, please contact us within 7 days at
              inmatess.xyz@gmail.com, and we’ll work to resolve it.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              6. Do you ship internationally?
            </h4>
            <p className="text-[#B39600]">
              Currently, we ship only within India. International shipping
              options may become available in the future, so stay tuned for
              updates.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              7. How do I track my order?
            </h4>
            <p className="text-[#B39600]">
              Once your order is shipped, you’ll receive a confirmation email
              with a tracking number. Use this number on the courier’s website
              to track the status of your delivery.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              8. What if I receive a damaged or defective item?
            </h4>
            <p className="text-[#B39600]">
              If you receive a damaged or incorrect item, please contact us at
              inmatess.xyz@gmail.com within 7 days of receiving your order.
              Provide us with your order details and a photo of the issue, and
              we’ll help resolve it as soon as possible.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              9. Do you offer discounts or promotions?
            </h4>
            <p className="text-[#B39600]">
              We occasionally offer special promotions and discounts. To stay
              updated on our latest offers, follow us on social media or
              subscribe to our newsletter.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-[#A20000]">
              10. How can I contact customer support?
            </h4>
            <p className="text-[#B39600]">
              For any questions or assistance, feel free to email us at
              inmatess.xyz@gmail.com. Our team is here to help and will respond
              to your inquiry as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* <NewsletterBox></NewsletterBox> */}
    </div>
  );
};

export default Contact;
