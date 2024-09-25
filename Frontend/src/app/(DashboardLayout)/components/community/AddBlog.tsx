import React from "react";

const AddBlog = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 w-4/5 sm:w-1/3 border-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="">Tilte</label>
        <input
          type="text"
          className="p-4 border-2 border-gray-200 rounded-md outline-none "
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="">Discription</label>
        <textarea className="p-4 border-2 border-gray-200 rounded-md outline-none " />
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button className="p-2 border-2 border-gray-200 rounded-md  bg-[#a67b5b71] text-white outline-none text-center ">
          Post Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
