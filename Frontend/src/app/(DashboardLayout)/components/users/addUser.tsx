'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data type
interface IFormInput {
  product_name: string;
  description: string;
  price: number;
  quantity: number;
}

const AddProduct: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [image, setImage] = useState<File | null>(null); // To store the image file

  // Handle the file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);  // Store the first selected file
    }
  };

  // Function to handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Create FormData for the request
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());  // Convert to string
    formData.append("quantity", data.quantity.toString());  // Convert to string
    if (image) {
      formData.append("image", image);  // Append the selected image file if exists
    }

    // Call the backend API
    try {
      const response = await fetch(
        "https://cofeetracebackend-2.onrender.com/api/v0/product/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product added successfully:", data);
        // Handle success (e.g., clear form, show success message)
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 w-4/5 sm:w-1/3 border-2 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            {...register("product_name", { required: "Product Name is required" })}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
          {errors.product_name && <p className="text-red-500">{errors.product_name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              {...register("price", { required: "Price is required", valueAsNumber: true })}
              className="p-4 border-2 border-gray-200 rounded-md outline-none"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
              className="p-4 border-2 border-gray-200 rounded-md outline-none"
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <input
            type="submit"
            value="Add Product"
            className="w-full p-4 border-2 bg-[#A67B5B] text-white border-gray-200 rounded-md outline-none text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
