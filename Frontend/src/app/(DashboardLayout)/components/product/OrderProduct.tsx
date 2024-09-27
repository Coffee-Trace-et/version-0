import React from "react";

const OrderProduct = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 w-4/5 sm:w-1/2 md:w-1/3 border-2 rounded-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="start-destination">Start Destination</label>
        <input
          id="start-destination"
          type="text"
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        />
      </div>

      <div className="flex flex-col  gap-2">
        <label htmlFor="price">Quantity</label>
        <input
          id="price"
          type="number"
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="coverage">Driving Coverage</label>
        <select
          id="coverage"
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        >
          <option value="covered">Covered</option>
          <option value="uncovered">Uncovered</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="driver">Driver Selection</label>
        <select
          id="driver"
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        >
          <option value="">Select Driver</option>
          <option value="john_doe">John Doe</option>
          <option value="jane_smith">Jane Smith</option>
          <option value="mohammed_ali">Mohammed Ali</option>
          <option value="abel_kebede">Abel Kebede</option>
          <option value="maria_gonzalez">Maria Gonzalez</option>
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="submit"
          value="Order Now"
          className="w-full p-4 border-2 bg-[#A67B5B] text-white border-gray-200 rounded-md outline-none text-center"
        />
      </div>
    </div>
  );
};

export default OrderProduct;
