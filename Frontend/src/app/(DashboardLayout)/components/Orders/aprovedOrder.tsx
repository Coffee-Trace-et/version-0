'use client'
import { TbMoneybag } from "react-icons/tb";
import { useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";

const ApprovedOrder = () => {
  const approved = [
    {
      icon: <TbMoneybag />,
      name: "Fikru Mengistu",
      location: "Dire Dawa",
      type: "Harar",
      shipping: "Pending",
      quantity: "250 kg",
      totalPrice: "3000,000 birr",
      bg: "bg-pink-200",
    },
    {
      icon: <TbMoneybag />,
      name: "Girma Tesfaye",
      location: "Gondar",
      type: "Limu",
      shipping: "Pending",
      quantity: "180 kg",
      totalPrice: "3000,000 birr",
      bg: "bg-purple-200",
    },
    {
      icon: <TbMoneybag />,
      name: "Hana Belete",
      location: "Shashamane",
      type: "Bale",
      shipping: "Pending",
      quantity: "220 kg",
      bg: "bg-blue-200",
      totalPrice: "3000,000 birr",
    },
    {
      icon: <TbMoneybag />,
      name: "Ibrahim Mohammed",
      location: "Adama",
      type: "Aleta Wondo",
      shipping: "Pending",
      quantity: "160 kg",
      bg: "bg-green-200",
      totalPrice: "3000,000 birr",
    },
    {
      icon: <TbMoneybag />,
      name: "Jemal Ali",
      location: "Gambela",
      type: "Kaffa",
      shipping: "Pending",
      quantity: "210 kg",
      bg: "bg-yellow-200",
      totalPrice: "3000,000 birr",
    },
    {
      icon: <TbMoneybag />,
      name: "Kebede Desta",
      location: "Harar",
      type: "Illubabor",
      shipping: "Pending",
      quantity: "170 kg",
      bg: "bg-red-200",
      totalPrice: "3000,000 birr",
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(approved.length / itemsPerPage);

  const getPagedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return approved.slice(startIndex, startIndex + itemsPerPage);
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
              ? "bg-palette-primary-main text-white"
              : "bg-white text-palette-primary-main border border-primary.main"
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
      <h1 className="text-xl font-semibold my-4 text-[#343C6A]">Approved Orders</h1>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-6 w-full">
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
                    <p>{items.type}</p>
                    <p className="text-sm text-[#718EBF]">{items.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="flex flex-col text-lg font-semibold">
                    <p>Total Price</p>
                    <p className="text-sm text-[#718EBF]">{items.totalPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="flex flex-col text-lg font-semibold">
                    <p>Shipping</p>
                    <p className="text-sm text-[#FFBB38]">{items.shipping}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 w-full md:w-1/5">
                <button className="py-2 px-5 border-2 border-b-gray-200 rounded-full text-[#FFBB38]">
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <div className="flex justify-center items-center p-4">
            <button
              className="cursor-pointer text-sm text-palette-primary-main flex items-center gap-1 px-4 py-1"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FaLessThan /> Previous
            </button>
            <div>{renderPageButtons()}</div>
            <button
              className="cursor-pointer text-sm text-palette-primary-main flex items-center gap-1 px-4 py-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next <FaGreaterThan />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedOrder;
