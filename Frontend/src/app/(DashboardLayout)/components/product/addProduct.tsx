"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/app/firebase"; // Your firebase config file

// Define the form data type
interface IFormInput {
  product_name: string;
  description: string;
  price: number; // Price should be a number (float)
  quantity: number; // Quantity should be a number (float)
  origin: number;
  image_url: string; // For the uploaded image URL
}

const AddProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImageToCloud(file);
      setValue("image_url", imageUrl); // Update form value with the image URL
    }
  };

  const uploadImageToCloud = async (file: File): Promise<string> => {
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error during upload:", error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadProgress(null);
            resolve(url);
          } catch (err) {
            console.error("Error getting download URL:", err);
            reject(err);
          }
        }
      );
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZmM2JkMjRiMDliZjFmMTE4NGE1YWE1Iiwicm9sZSI6ImZhcm1lciIsIm5hbWUiOiJ0ZWtsdW1vIn0.lcr6-u5QOUtnDuSvRRkn-qtWvoXkq1pITem01OOUjuc";

    try {
      const response = await fetch(
        "https://cofeetracebackend-2.onrender.com/api/v0/product/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add the Authorization header
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Product added successfully:", responseData);
        // Handle success (e.g., clear form, show success message)
      } else {
        const errorData = await response.json();
        console.error("Error adding product:", errorData);
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
            {...register("product_name", {
              required: "Product Name is required",
            })}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
          {errors.product_name && (
            <p className="text-red-500">{errors.product_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="origin">Origin</label>
          <input
            type="text" // Ensure this is a number input
            id="origin"
            {...register("origin", {
              required: "origin is required",
              valueAsNumber: true,
            })}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
          {errors.origin && (
            <p className="text-red-500">{errors.origin.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            className="mt-1 block w-full text-sm p-4 border-2 border-gray-200 rounded-md outline-none text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-palette-primary-main hover:file:bg-violet-100"
            onChange={handleFileChange}
          />
          {uploadProgress !== null && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm mt-1">
                {Math.round(uploadProgress)}% uploaded
              </p>
            </div>
          )}
          {errors.image_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image_url.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="p-4 border-2 border-gray-200 rounded-md outline-none"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              id="price"
              {...register("price", { required: "Price is required" })}
              className="p-4 border-2 border-gray-200 rounded-md outline-none"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity", { required: "Quantity is required" })}
              className="p-4 border-2 border-gray-200 rounded-md outline-none"
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="submit"
            value="Add Product"
            className="w-full p-4 border-2 bg-palette-primary-main text-white border-gray-200 rounded-md outline-none text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
