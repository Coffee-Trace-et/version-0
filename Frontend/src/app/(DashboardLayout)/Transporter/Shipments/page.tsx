"use client";
import Image from "next/image";
import React from "react";
import { MdMyLocation } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import { FiPhone } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import Link from "next/link";
import { Phone } from "@mui/icons-material";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import DashboardCard from "../../components/shared/DashboardCard";
import { RecentTransactionsProps, Destination } from "@/utils/types/types";
import { useState } from "react";

const destinations: Destination[] = [
  {
    time: "09:30 am",
    content: "Payment received from John Doe of $385.90",
    color: "primary",
    latitude: 9.0204,
    longitude: 38.7465,
  },
  {
    time: "10:00 am",
    content: "New sale recorded #ML-3467",
    color: "secondary",
    latitude: 9.0204,
    longitude: 38.7465,
  },
  {
    time: "12:00 am",
    content: "Payment was made of $64.95 to Michael",
    color: "success",
    latitude: 9.0204,
    longitude: 38.7465,
  },
  {
    time: "09:30 am",
    content: "New sale recorded #ML-3467",
    color: "warning",
    latitude: 9.0204,
    longitude: 38.7465,
  },
  {
    time: "09:30 am",
    content: "New arrival recorded",
    color: "error",
    latitude: 9.0204,
    longitude: 38.7465,
  },
  {
    time: "12:00 am",
    content: "Payment Received",
    color: "success",
    latitude: 9.0204,
    longitude: 38.7465,
  },
];
const OnGoingDelivery = [
  {
    id: 1,
    shipmentNumber: "EV-Teklu",
    from: "Harer",
    fromRegion: "Har 1",
    to: "Adama",
    toRegion: "Ada 1",
    client: "Abebe Kebede",
    company: "Marain, LTD",
    type: "Coffee",
    image: "/images/profile/user-1.jpg",
    Phone: "0900423958",

    price: "10000ETB",
    quantity: "10 packages",
    weight: "1000kg",

    driver: "Teklu Moges",
    truckNumber: "B-1234",
    truckType: "Trailer Truck",
    curDestinations: destinations,
  },
  {
    id: 2,
    shipmentNumber: "EV-120253",
    from: "Harer",
    fromRegion: "Har 1",
    to: "Adama",
    toRegion: "Ada 1",
    client: "Kebede Abebe",
    company: "Marain, LTD",
    type: "Coffee",
    image: "/images/profile/user-1.jpg",
    Phone: "0900423958",

    price: "10000ETB",
    quantity: "10 packages",
    weight: "1000kg",

    driver: "Teklu Moges",
    truckNumber: "B-1234",
    truckType: "Trailer Truck",
    curDestinations: destinations,
  },
];

const Page = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <section className="">
      <div className="hidden md:flex gap-16">
        <div className="overflow-hidden overflow-y-scroll  max-h-[100dvh]">
          <input
            type="text"
            placeholder="Search shipment..."
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <h1 className="text-xl font-semibold mb-6 text-gray-700">
            Ongoing Delivery
          </h1>
          {OnGoingDelivery.map((delivery, i) => (
            <div key={i}>
              <div className="w-[370px] h-[374px] mb-10 ">
                <div className="bg-white shadow-lg border-2 border-palette-primary-main  rounded-lg p-6 w-full max-w-lg">
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Shipment number</p>
                        <p className="text-lg font-bold text-gray-700">
                          {delivery.shipmentNumber}
                        </p>
                        <p className="text-sm text-gray-600">{delivery.type}</p>
                      </div>
                      <div>
                        <Image
                          src="/images/icons/buss.svg"
                          alt="qr-code"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <MdMyLocation className="text-blue-600 text-xl" />
                      <div className="ml-3">
                        <p className="text-lg font-semibold text-gray-700">
                          {delivery.from}
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.fromRegion}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <IoLocationSharp className="text-red-500 text-xl" />
                      <div className="ml-3">
                        <p className="text-lg font-semibold text-gray-700">
                          {delivery.to}
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.toRegion}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/images/profile/user-1.jpg"
                        alt="profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="text-lg font-semibold text-gray-700">
                          {delivery.client}
                        </p>
                        <p className="text-sm text-gray-600">
                          {delivery.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`tel:+${delivery.Phone}`}
                        className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2"
                      >
                        <FiPhone className="text-palette-primary-main    text-xl" />
                      </Link>
                      <div className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2">
                        <MdMessage className="text-palette-primary-main  text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 overflow-hidden overflow-y-scroll  max-h-[100dvh]">
          <div className="p-6  bg-white border max-h-[200px]  rounded-md shadow-md">
            <div className="md:w-[500px] w-[380px] flex flex-col gap-4 ">
              <h1 className="font-semibold text-lg ">Shipping Info</h1>
              <div className="flex justify-between ">
                <div className="w-1/3">
                  <p className="text-gray-400">Shipment Number</p>
                  <p className="text-gray-800 font-semibold">
                    {OnGoingDelivery[0].shipmentNumber}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p className="text-gray-400">campany</p>
                  <p className="text-gray-800 font-semibold">
                    {OnGoingDelivery[0].company}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p className="text-gray-400">Type</p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].type}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Quantity
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].quantity}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Weight
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].weight}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Price
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6  bg-white border max-h-[200px]  rounded-md shadow-md">
            <div className="md:w-[500px] w-[380px] flex flex-col gap-4 ">
              <h1 className="font-semibold text-lg ">Driver Info</h1>
              {/* <DashboardCard title="Driver Info" /> */}
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/profile/user-1.jpg"
                    width={60}
                    height={60}
                    alt="new"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {OnGoingDelivery[0].driver}
                    </p>
                    <p className="text-gray-400">Online</p>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <Link
                      href={`tel:+${OnGoingDelivery[0].Phone}`}
                      className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2"
                    >
                      <FiPhone className="text-palette-primary-main    text-xl" />
                    </Link>
                    <div className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2">
                      <MdMessage className="text-palette-primary-main  text-xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Truck number
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].truckNumber}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Truck type
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].truckType}
                  </p>
                </div>
                <div className="w-1/3 ml-5">
                  <p
                    className="text-gray-400"
                    // style={{ textTransform: "capitalize" }}
                  >
                    Trailer number
                  </p>
                  <p
                    className="text-gray-800 font-semibold"
                    // style={{ textTransform: "capitalize" }}
                  >
                    {OnGoingDelivery[0].truckNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <RecentTransactions
              destinations={OnGoingDelivery[0].curDestinations}
            />
          </div>
        </div>
      </div>
      <div className=" md:hidden items-center justify-center flex gap-16">
        {!open && (
          <div>
            <input
              type="text"
              placeholder="Search shipment..."
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <h1 className="text-xl font-semibold mb-6 text-gray-700">
              Ongoing Delivery
            </h1>
            {OnGoingDelivery.map((delivery, i) => (
              <div key={i}>
                <div className="w-[380px] h-[374px] mb-10 ">
                  <div className="bg-white shadow-lg border-2 border-palette-primary-main  rounded-lg p-6 w-full max-w-lg">
                    <div className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Shipment number
                          </p>
                          <p className="text-lg font-bold text-gray-700">
                            {delivery.shipmentNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {delivery.type}
                          </p>
                        </div>
                        <div>
                          <Image
                            src="/images/icons/buss.svg"
                            alt="qr-code"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <MdMyLocation className="text-blue-600 text-xl" />
                        <div className="ml-3">
                          <p className="text-lg font-semibold text-gray-700">
                            {delivery.from}
                          </p>
                          <p className="text-xs text-gray-500">
                            {delivery.fromRegion}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <IoLocationSharp className="text-red-500 text-xl" />
                        <div className="ml-3">
                          <p className="text-lg font-semibold text-gray-700">
                            {delivery.to}
                          </p>
                          <p className="text-xs text-gray-500">
                            {delivery.toRegion}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/images/profile/user-1.jpg"
                          alt="profile"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Client</p>
                          <p className="text-lg font-semibold text-gray-700">
                            {delivery.client}
                          </p>
                          <p className="text-sm text-gray-600">
                            {delivery.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`tel:+${delivery.Phone}`}
                          className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2"
                        >
                          <FiPhone className="text-palette-primary-main    text-xl" />
                        </Link>
                        <div className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2">
                          <MdMessage className="text-palette-primary-main  text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {open && (
          <div className="flex flex-col  gap-6 ">
            <div className="md:p-6 p-2  bg-white border max-h-[200px]  rounded-md shadow-md">
              <div className="md:w-[500px] w-[370px] flex flex-col gap-4 ">
                <h1 className="font-semibold text-lg ">Shipping Info</h1>
                <div className="flex justify-between ">
                  <div className="w-1/3">
                    <p className="text-gray-400">Shipment Number</p>
                    <p className="text-gray-800 font-semibold">
                      {OnGoingDelivery[0].shipmentNumber}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p className="text-gray-400">campany</p>
                    <p className="text-gray-800 font-semibold">
                      {OnGoingDelivery[0].company}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p className="text-gray-400">Type</p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].type}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/3">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Quantity
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].quantity}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Weight
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].weight}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Price
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6  bg-white border max-h-[200px]  rounded-md shadow-md">
              <div className="md:w-[500px] w-[380px] flex flex-col gap-4 ">
                <h1 className="font-semibold text-lg ">Driver Info</h1>
                {/* <DashboardCard title="Driver Info" /> */}
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/images/profile/user-1.jpg"
                      width={60}
                      height={60}
                      alt="new"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {OnGoingDelivery[0].driver}
                      </p>
                      <p className="text-gray-400">Online</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <Link
                        href={`tel:+${OnGoingDelivery[0].Phone}`}
                        className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2"
                      >
                        <FiPhone className="text-palette-primary-main    text-xl" />
                      </Link>
                      <div className="bg-palette-secondary-light cursor-pointer text-white rounded-md p-2">
                        <MdMessage className="text-palette-primary-main  text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/3">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Truck number
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].truckNumber}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Truck type
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].truckType}
                    </p>
                  </div>
                  <div className="w-1/3 ml-5">
                    <p
                      className="text-gray-400"
                      // style={{ textTransform: "capitalize" }}
                    >
                      Trailer number
                    </p>
                    <p
                      className="text-gray-800 font-semibold"
                      // style={{ textTransform: "capitalize" }}
                    >
                      {OnGoingDelivery[0].truckNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <RecentTransactions
                destinations={OnGoingDelivery[0].curDestinations}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
