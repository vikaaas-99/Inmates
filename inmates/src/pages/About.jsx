import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"Terms and"} text2={" Conditions"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.inmateslogo}
          alt="Inmatess Logo"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <h2 className="text-[#A20000] font-bold">Welcome to Inmatess</h2>
          <p className="text-[#B39600]">
            A premium clothing brand committed to delivering quality and style.
            By accessing or using our website and services, you agree to comply
            with the following Terms and Conditions. If you disagree with any
            part of these terms, please refrain from using our services.
          </p>

          <h3 className="text-[#A20000] font-bold">Product Orders</h3>
          <p className="text-[#B39600]">
            All orders are placed online through our website. Full payment is
            required at checkout as we do not offer Cash on Delivery (COD)
            options. By placing an order, you confirm that all details provided
            are accurate and complete.
          </p>

          <h3 className="text-[#A20000] font-bold">
            Product Description and Colors
          </h3>
          <p className="text-[#B39600]">
            We aim to provide detailed and accurate product descriptions.
            However, actual colors may slightly vary due to individual screen
            settings. Please consider this when purchasing, as we cannot
            guarantee that your screen accurately reflects the product’s true
            color.
          </p>

          <h3 className="text-[#A20000] font-bold">
            No Return or Exchange Policy
          </h3>
          <p className="text-[#B39600]">
            All sales are final. We do not offer returns or exchanges for any of
            our products. If you encounter an issue with your order, such as
            defects or incorrect items, please contact us at
            inmatess.xyz@gmail.com within 7 days of receiving your order, and we
            will do our best to resolve it.
          </p>

          <h3 className="text-[#A20000] font-bold">Pricing and Payment</h3>
          <p className="text-[#B39600]">
            All prices are in INR (Indian Rupee) and are subject to change
            without notice. Payment is required at the time of purchase, and we
            accept various secure payment methods to facilitate your order.
          </p>

          <h3 className="text-[#A20000] font-bold">Intellectual Property</h3>
          <p className="text-[#B39600]">
            All content on this website, including brand names, logos, images,
            product designs, and descriptions, is the intellectual property of
            Inmatess. Unauthorized use or reproduction of any content is
            strictly prohibited.
          </p>

          <h3 className="text-[#A20000] font-bold">Limitation of Liability</h3>
          <p className="text-[#B39600]">
            Inmatess shall not be held liable for any direct or indirect damages
            that may arise from the use of our products or website, to the
            fullest extent permitted by law.
          </p>

          <h3 className="text-[#A20000] font-bold">Modifications</h3>
          <p className="text-[#B39600]">
            We reserve the right to change or update these Terms and Conditions
            at any time without prior notice. It is your responsibility to
            review this page periodically for any changes.
          </p>

          <h3 className="text-[#A20000] font-bold">Privacy Policy</h3>
          <p className="text-[#B39600]">
            Inmatess respects your privacy and is committed to protecting your
            personal information. This Privacy Policy outlines how we collect,
            use, and safeguard your information.
          </p>

          <h3 className="text-[#A20000] font-bold">Information Collection</h3>
          <p className="text-[#B39600]">
            We collect personal information when you make a purchase, including
            your name, email address, shipping address, and payment details.
            Additionally, we may collect browsing data to improve your
            experience on our site.
          </p>

          <h3 className="text-[#A20000] font-bold">Use of Information</h3>
          <p className="text-[#B39600]">
            The information we collect is used to fulfill orders, enhance your
            shopping experience, and improve our brand offerings. We may also
            use your email address to send you promotional offers, but you may
            opt out at any time.
          </p>

          <h3 className="text-[#A20000] font-bold">Data Security</h3>
          <p className="text-[#B39600]">
            We employ security measures to protect your information. However, no
            online system can be guaranteed to be completely secure, and we
            cannot be held responsible for any breach outside our control.
          </p>

          <h3 className="text-[#A20000] font-bold">Third-Party Disclosure</h3>
          <p className="text-[#B39600]">
            Your personal information may be shared with third-party services
            that assist with payment processing, shipping, and site analytics.
            These third parties have limited access to your information and are
            obligated to protect it.
          </p>

          <h3 className="text-[#A20000] font-bold">Your Rights</h3>
          <p className="text-[#B39600]">
            You have the right to access, modify, or request the deletion of
            your personal information at any time. For any privacy-related
            inquiries, please contact us at inmatess.xyz@gmail.com.
          </p>

          <h3 className="text-[#A20000] font-bold">Policy Updates</h3>
          <p className="text-[#B39600]">
            We may update this Privacy Policy periodically. Please review this
            page to stay informed about any changes.
          </p>

          <h3 className="text-[#A20000] font-bold">
            Shipping & Delivery Policy
          </h3>
          <p className="text-[#B39600]">
            At Inmatess, we prioritize prompt shipping to ensure our customers
            receive their orders as quickly as possible.
          </p>

          <h3 className="text-[#A20000] font-bold">
            Order Processing and Dispatch
          </h3>
          <p className="text-[#B39600]">
            All orders are processed and dispatched within 24 hours of order
            placement. You will receive an email confirmation with tracking
            information once your order is shipped.
          </p>

          <h3 className="text-[#A20000] font-bold">Delivery Times</h3>
          <p className="text-[#B39600]">
            Delivery times may vary based on your location. Please allow 3-7
            business days for delivery within India. For any delays or issues
            with your shipment, contact our support team at
            inmatess.xyz@gmail.com.
          </p>

          <h3 className="text-[#A20000] font-bold">Shipping Costs</h3>
          <p className="text-[#B39600]">
            Shipping charges, if applicable, are calculated at checkout. Free
            shipping may be available on orders over a specified amount, as
            indicated on our website.
          </p>

          <h3 className="text-[#A20000] font-bold">
            No Cash on Delivery (COD)
          </h3>
          <p className="text-[#B39600]">
            We do not offer COD (Cash on Delivery). All orders must be prepaid
            through the available payment methods on our website.
          </p>

          <h3 className="text-[#A20000] font-bold">Shipping Issues</h3>
          <p className="text-[#B39600]">
            If you encounter any issues with your delivery or receive the wrong
            item, please contact us within 7 days of receiving your order at
            inmatess.xyz@gmail.com.
          </p>

          <p className="text-[#B39600]">
            These policies are crafted to align with your brand’s approach to
            handling orders, customer data, and shipping. They should give your
            customers a clear understanding of your policies and set the right
            expectations for shopping with Inmatess.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
