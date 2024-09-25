import React from "react"

const AddProduct = () =>{
    return(
        <div className="flex flex-col gap-4 bg-white p-4 w-4/5 sm:w-1/2 border-2">
              <div className="flex flex-col gap-2">
              <label htmlFor="">Product Name</label>
              <input
                type="text"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Image</label>
              <input
                type="file"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Discription</label>
              <textarea
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex gap-2">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="">Price</label>
              <input
                type="number"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="">Qantity</label>
              <input
                type="number"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <input
                type="sumbit"
                value={"Add Product"}
                className="p-4 border-2 border-gray-200 rounded-md outline-none text-center "
              />
            </div>
        </div>
    )
}

export default AddProduct;