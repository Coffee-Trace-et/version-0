import React from "react";
import CoffeeImage from "@/../../public/images/products/coffeeNo1.svg";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Product = () => {
  const card = [
    {
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },{
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },{
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },{
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },
  ];

  return (
    <div className="flex gap-5 flex-wrap justify-center  sm:justify-between  overflow-y-auto">
      {card.map((item, index) => (
        <div className="sm:w-[45%] lg:w-[29%] w-full flex flex-col gap-3 p-4 items-center rounded-lg border-2">
          <Image
            src={CoffeeImage}
            alt="Coffee image"
            width={40}
            height={40}
            className="w-[97%]"
          />
          <div className="text-[#939393] font-semibold text-[16px] pb-4">
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
      ))}
    </div>
  );
};

export default Product;
