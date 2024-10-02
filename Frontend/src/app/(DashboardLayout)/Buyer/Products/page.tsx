"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../../components/product/ProductCard";
import AddProduct from "../../components/product/addProduct";
import { Box, Rating } from "@mui/material";
import { Slider } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { Product } from "@/utils/types/types";
import OrderProduct from "../../components/product/OrderProduct";

import Loader from "../../components/Loder/Loder";

const Page = () => {
  // loader

  const [curLoading, setCurLoading] = useState<boolean>(false);

  const [value, setValue] = useState<number[]>([20, 37]);
  const [rating, setRating] = useState<number | null>(2);
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { data: session, status } = useSession();

  // Fetch products from the API

  useEffect(() => {
    const fetchProducts = async () => {
      setCurLoading(true);
      try {
        const response = await fetch(
          "https://cofeetracebackend-2.onrender.com/api/v0/product/getall",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Initially, display all products
        console.log("Products fetched:", data.products);
        setCurLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [session]);

  const handleAddProduct = (Product: any) => {
    setSelectedProductForOrder(Product);

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

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApplyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.origin);
      const matchesLocation =
        !selectedLocation || product.origin === selectedLocation;
      const matchesPrice =
        Number(product.price) >= value[0] && Number(product.price) <= value[1];
      const matchesRating = rating === null || product.rating >= rating;

      return matchesType && matchesLocation && matchesPrice && matchesRating;
    });

    setFilteredProducts(filtered);
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedLocation("");
    setValue([50, 100]);
    setRating(2);
    setFilteredProducts(products); // Reset to initial products
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  // handling ordering the product

  const [selectedProductForOrder, setSelectedProductForOrder] =
    useState<Product | null>(null);

  ////////////////////////////////////////////////////////////////////////////////////////

  if (curLoading || status === "loading") {
    return (
      <div className="flex item-center justify-center h-screen">
        <Loader />;
      </div>
    );
  }
  //////////////////
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
              <input
                type="checkbox"
                onChange={() => handleTypeChange("Yirgachefe")}
                checked={selectedTypes.includes("Yirgachefe")}
              />
              <label htmlFor="">Yirgachefe</label>
            </div>
            <div className="flex gap-3 w-1/2 items-center ">
              <input
                type="checkbox"
                onChange={() => handleTypeChange("Illubabur")}
                checked={selectedTypes.includes("Illubabur")}
              />
              <label htmlFor="">Illubabur</label>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex w-1/2 gap-3 items-center ">
              <input
                type="checkbox"
                onChange={() => handleTypeChange("Jimma")}
                checked={selectedTypes.includes("Jimma")}
              />
              <label htmlFor="">Jimma</label>
            </div>
            <div className="flex gap-3 w-1/2 items-center ">
              <input
                type="checkbox"
                onChange={() => handleTypeChange("Kafa")}
                checked={selectedTypes.includes("Kafa")}
              />
              <label htmlFor="">Kafa</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold py-2 text-gray-700">Location</h1>
          <select
            className="px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
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
              onChange={(e) =>
                handleChange(e as any, [Number(e.target.value), value[1]])
              }
            />
            <input
              type="text"
              placeholder="Max"
              className="border-2 py-2 text-center px-4 w-1/4 rounded-md"
              value={value[1]}
              onChange={(e) =>
                handleChange(e as any, [value[0], Number(e.target.value)])
              }
            />
          </div>

          <Box sx={{ width: "auto" }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
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
          <button
            className="border-2 py-2 px-5 rounded-md font-bold text-lg"
            onClick={handleResetFilters}
          >
            Reset
          </button>
          <button
            className="border-2 py-2 px-5 rounded-md font-bold text-lg"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="w-full sm:w-4/5 overflow-hidden overflow-y-scroll max-h-[100dvh]">
        {open && (
          <div className="fixed inset-0 z-50  flex items-center justify-center bg-[#00000057] ">
            <div
              className=" absolute top-5 right-5 border-2 p-2 text-2xl text-white rounded-full "
              onClick={handleCloseAddProduct}
            >
              <RiCloseLine />
            </div>
            {selectedProductForOrder && (
              <OrderProduct product={selectedProductForOrder} />
            )}
          </div>
        )}
        <div className="flex gap-5 flex-wrap justify-center sm:justify-between overflow-y-auto">
          {filteredProducts?.map((product, index) => (
            <div
              key={index}
              className="sm:w-[45%] lg:w-[29%] w-full flex flex-col gap-3 p-4 items-center rounded-lg border-2 cursor-pointer"
              onClick={() => handleAddProduct(product)}
            >
              {parseInt(product.quantity, 10) > 0 && (
                <ProductCard
                  image={product.image_url || ""}
                  name={product.product_name}
                  price={`$${product.price}`}
                  amount={`${product.quantity} kg`}
                  rating={product.rating.toFixed(1)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
