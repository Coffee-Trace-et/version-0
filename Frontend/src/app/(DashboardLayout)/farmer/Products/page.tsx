"use client";

import React, { useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import AddProduct from "../../components/product/addProduct";
import { Box, Rating } from "@mui/material";
import { Slider } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

const page = () => {
  const [value, setValue] = useState<number[]>([20, 37]);
  const [rating, setRating] = useState<number | null>(2);
  const [open, setOpen] = useState<boolean>(false);

  const card = [
    {
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },
    {
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },
    {
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },
    {
      image: "",
      name: "Yetelekeme Yirgachefe Buna",
      price: "$2000",
      amount: "50 kg",
      rating: "4.3",
    },
  ];

  const handleAddProduct = () => {
    setOpen(!open);
  };
  const handleCloseAddProduct = () => {
    setOpen(false);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleInputChange = (index: number, newValue: string) => {
    const updatedValue = [...value];
    updatedValue[index] = Number(newValue);
    setValue(updatedValue);
  };

  return (
    <div className="flex gap-5 w-full relative">
      <div className="hidden sm:block sm:w-1/3 lg:w-1/4 border-2 py-4 px-2">
        <h1 className="text-2xl font-semibold mb-3 py-2 text-gray-700 border-b-2">
          Filters
        </h1>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold py-2 text-gray-700">Type</h1>
          <div className="flex gap-3">
            <div className="flex gap-3 w-1/2 items-center ">
              <input type="checkbox" />
              <label htmlFor="">Yirgachefe</label>
            </div>
            <div className="flex gap-3 w-1/2 items-center ">
              <input type="checkbox" />
              <label htmlFor="">Illubabur</label>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex w-1/2 gap-3 items-center ">
              <input type="checkbox" />
              <label htmlFor="">Jimma</label>
            </div>
            <div className="flex gap-3 w-1/2 items-center ">
              <input type="checkbox" />
              <label htmlFor="">Kafa</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold py-2 text-gray-700">Location</h1>
          <select className="px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Yirgachefe">Yirgachefe</option>
            <option value="Harar">Harar</option>
            <option value="Sidamo">Sidamo</option>
            <option value="Jimma">Jimma</option>
            <option value="Illubabur">Illubabur</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold py-2 text-gray-700">Price/kg</h1>
          <div className="flex justify-between w-full">
            <input
              type="text"
              placeholder="Min"
              className="border-2 py-2 text-center px-4 w-1/4 rounded-md"
              value={value[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <input
              type="text"
              placeholder="Max"
              className="border-2 py-2 text-center px-4 w-1/4 rounded-md"
              value={value[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
          </div>

          <Box sx={{ width: "auto" }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold py-2 text-gray-700">Rating</h1>
          <Box sx={{ width: "auto" }}>
            <Rating
              name="controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
        </div>
        <div className="flex justify-around w-full py-4">
          <button className="border-2 py-2 px-5 rounded-md font-bold text-lg">
            Reset
          </button>
          <button className="border-2 py-2 px-5 rounded-md font-bold text-lg">
            Apply
          </button>
        </div>
      </div>

      <div className="w-full sm:w-4/5 overflow-hidden overflow-y-scroll max-h-[100dvh]">
        <div className="hidden  sm:flex justify-end w-full py-4">
          <button
            className="border-2 py-2 px-5 rounded-md font-bold text-lg text-white bg-[#A67B5B] focus:border-black"
            onClick={handleAddProduct}
          >
            Post Your Product
          </button>
        </div>
        <div className="sm:hidden w-full flex gap-3 items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Search shipment..."
            className="w-4/5 p-4 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className=" text-center  text-white p-4 rounded-full bg-[#A67B5B]">
            <FaPlus onClick={handleAddProduct} />
          </div>
        </div>
        {open && (
          <div className="fixed inset-0 z-50  flex items-center justify-center bg-[#00000057] ">
            <div
              className=" absolute top-5 right-5 border-2 p-2 text-2xl text-white rounded-full "
              onClick={handleCloseAddProduct}
            >
              <RiCloseLine />
            </div>
            <AddProduct />
          </div>
        )}
        <div className="flex gap-5 flex-wrap justify-center  sm:justify-between  overflow-y-auto">
          {card.map((product, index) => (
            <div className="sm:w-[45%] lg:w-[29%] w-full flex flex-col gap-3 p-4 items-center rounded-lg border-2 cursor-pointer">
              <ProductCard key={index} {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
