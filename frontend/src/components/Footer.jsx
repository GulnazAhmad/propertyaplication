import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="gap-8 flex text-sm md:text-md bg-black text-white px-8 py-8 md:px-[500] items-center justify-center mt-5 md:mt-8">
        <div className="w-[30%] flexbox">
          <p>
            <Link to="/featured">Featured Blogs</Link>
          </p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="w-[30%] flexbox">
          <p>Forrum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="w-[30%] flexbox">
          <p>Privacy policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-2 text-sm text-center text-white bg-black">
        All rights are reserved by BlogMarket@2025
      </p>
    </>
  );
};

export default Footer;
