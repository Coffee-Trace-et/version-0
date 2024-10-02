import React, { useState } from "react";
import CoffeeImage from "@/../../public/images/products/coffeeNo1.svg";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import AddProduct from "./addProduct";

interface ProductCardType {
  image: string;
  name: string;
  price: string;
  amount: string;
  rating: string;
}

const Product = ({ ...item }: ProductCardType) => {
  return (
    <div className="w-full">
      <img
        src={item.image ? item.image : CoffeeImage}
        alt="Coffee image"
        width={40}
        height={40}
        className="w-[97%] h-44 object-cover rounded-md"
      />
      <div className="text-[#939393] font-semibold text-sm py-4">
        {item.name}
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center justify-start gap-2  text-sm">
          <p className="font-semibold">{item.price}</p>
          <p>|</p>
          <p>{item.amount}</p>
        </div>
        <div className="flex gap-2 items-center justify-start ">
          <FaStar className="text-[#F3C63F]" />
          <p>{item.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
