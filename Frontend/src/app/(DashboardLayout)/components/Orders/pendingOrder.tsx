'use client'
import React, { useState } from "react";
import {
  FaHandHoldingUsd,
  FaSortAmountUpAlt,
  FaCheck,
  FaTimes,
  FaLessThan,
  FaGreaterThan,
} from "react-icons/fa"; // Added check and times icons
import { TbMoneybag } from "react-icons/tb";

const PendingOrder = () => {
  const pending = [
    {
      icon: <TbMoneybag />,
      name: "Abebe Kebede",
      location: "Mekele",
      type: "Yirgachefe",
      shipping: "covered",
      quantity: "200 kg",
      bg: "bg-lime-200",
    },
    {
      icon: <TbMoneybag />,
      name: "Bekele Alemu",
      location: "Addis Ababa",
      type: "Sidamo",
      shipping: "not covered",
      quantity: "150 kg",
      bg: "bg-amber-200",
    },
    {
      icon: <TbMoneybag />,
      name: "Chala Tadesse",
      location: "Hawassa",
      type: "Guji",
      shipping: "covered",
      quantity: "300 kg",
      bg: "bg-orange-200",
    },
    {
      icon: <TbMoneybag />,
      name: "Desta Getachew",
      location: "Bahir Dar",
      type: "Jimma",
      shipping: "not covered",
      quantity: "100 kg",
      bg: "bg-teal-200",
    },
  ];



  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(pending.length / itemsPerPage);

  const getPagedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return pending.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`py-2 px-3 sm:px-4 md:py-2 rounded-xl mx-1 ${
            i === currentPage
              ? "bg-[#49BEFF] text-white"
              : "bg-white text-[#49BEFF] border border-primary.main"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };


  return (
    <div>
      <h1 className="text-3xl font-semibold my-4 text-[#343C6A]">
        Pending Orders
      </h1>

      <div className="flex flex-col gap-5 w-full">
        <div className=" flex flex-col gap-6 w-full">
            {getPagedData().map((items, index) => (
            <div
              key={index}
              className="flex flex-col gap-7 md:flex-row md:gap-4  py-4 px-5 border border-gray-200 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <div className={`text-3xl ${items.bg} rounded-2xl p-3 md:p-4`}>
                  {items.icon}
                </div>
                <div className="flex flex-col text-lg">
                  <p>{items.name}</p>
                  <p className="text-sm text-[#718EBF]">{items.location}</p>
                </div>
              </div>

              <div className="flex gap-4 md:w-3/5">
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="flex flex-col text-lg font-semibold">
                    <p>Type</p>
                    <p className="text-sm text-[#718EBF]">{items.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="flex flex-col text-lg font-semibold">
                    <p>Quantity</p>
                    <p className="text-sm text-[#718EBF]">{items.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="flex flex-col text-lg font-semibold">
                    <p>Shipping</p>
                    <p className="text-sm text-[#718EBF]">{items.shipping}</p>
                  </div>
                </div>
              </div>
                <div className="flex items-center justify-center gap-4 w-full md:w-1/5">
                  <button className="py-2 px-5 border border-b-gray-200 rounded-full text-green-600">
                    Approve
                  </button>
                  <button className="py-2 px-5 border border-b-gray-200 rounded-full text-red-600">
                    Reject
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-4">
          <div className="flex justify-center items-center p-4">
            <button
              className="cursor-pointer text-sm text-[#49BEFF] flex items-center gap-1 px-4 py-1"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FaLessThan /> Previous
            </button>
            <div>{renderPageButtons()}</div>
            <button
              className="cursor-pointer text-sm text-[#49BEFF] flex items-center gap-1 px-4 py-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next <FaGreaterThan />
            </button>
          </div>
        </div>
    </div>
  );
};

export default PendingOrder;
