"use client";
import React, { useState } from "react";
import { LuMessageSquare } from "react-icons/lu";
import { FaPaperclip, FaEye } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import User from "@/../../public/images/profile/user-1.jpg";
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";
import AddBlog from "../components/community/AddBlog";

interface Discription {
  description: string;
}

const ItemDescription = ({ description }: Discription) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const charLimit = 200;

  return (
    <div className="text-[#6D6F7B]">
      {isExpanded ? description : description.slice(0, charLimit)}
      {description.length > charLimit && (
        <button onClick={toggleExpanded} className="text-blue-500 ml-2">
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

const page = () => {
  const [activeTab, setActiveTab] = useState("discussion");
  const [open, setOpen] = useState<boolean>(false);

  const handleAddPost = () => {
    setOpen(!open);
  };
  const handleCloseAddPost = () => {
    setOpen(false);
  };

  const follow = [
    {
      name: "Abebe Kebede",
      sugestion: "Talk about coffee",
    },
    {
      name: "Alemitu Gosa",
      sugestion: "Talk about coffee",
    },
    {
      name: "Amanuel Chala",
      sugestion: "Talk about coffee Production",
    },
  ];

  const blog = [
    {
      author: {
        name: "Abebe Kebede",
        image: "image url",
      },
      title: "How to Improve coffee production",
      discription:
        "To improve coffee production, farmers can adopt sustainable practices, enhance soil health, diversify crop varieties, conserve water, use technology for precision farming, optimize post-harvest handling, and build direct trade relationships for better market access and profitability.",
      tags: ["coffee improvment", "Study-Group"],
      replies: "28",
      views: "875",
      createdAt: "2 day ago",
    },
    {
      author: {
        name: "Abebe Kebede",
        image: "image url",
      },
      title: "How to Improve coffee production",
      discription:
        "To improve coffee production, farmers can adopt sustainable practices, enhance soil health, diversify crop varieties, conserve water, use technology for precision farming, optimize post-harvest handling, and build direct trade relationships for better market access and profitability.",
      tags: ["coffee improvment", "Study-Group"],
      replies: "28",
      views: "875",
      createdAt: "2 day ago",
    },
    {
      author: {
        name: "Abebe Kebede",
        image: "image url",
      },
      title: "How to Improve coffee production",
      discription:
        "To improve coffee production, farmers can adopt sustainable practices, enhance soil health, diversify crop varieties, conserve water, use technology for precision farming, optimize post-harvest handling, and build direct trade relationships for better market access and profitability.",
      tags: ["coffee improvment", "Study-Group"],
      replies: "28",
      views: "875",
      createdAt: "2 day ago",
    },
  ];

  const sugestion = [
    {
      tag: "Coffee",
    },
    {
      tag: "Study-group",
    },
    {
      tag: "System-update",
    },
  ];

  return (
    <div className="flex justify-between">
      <div className="w-full  relative lg:w-3/5 flex gap-10 flex-col">
        <div className=" w-full sticky flex justify-between items-center shadow-md p-2">
          <div className=" flex gap-10">
            <div className="flex items-center text-xl gap-3">
              <LuMessageSquare />
              <h1>Discussion</h1>
            </div>
            <div className="flex items-center text-xl gap-3">
              <FaPaperclip />
              <h1>Resource</h1>
            </div>
          </div>
          <div>
            <button
              className="px-6 py-2 border-2 border-gray-200  bg-[#A67B5B]  text-white rounded-md outline-none text-center "
              onClick={handleAddPost}
            >
              Post
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 overflow-hidden overflow-y-scroll max-h-[100dvh]">
          {blog.map((items, index) => (
            <div
              key={index}
              className="flex flex-col p-4 border-2 rounded-md gap-4 "
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <Image
                    src={User}
                    alt="userprofile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <p>By: {items.author.name}</p>
                </div>
                <p>{items.createdAt}</p>
              </div>
              <div className="text-lg font-semibold text-[#6D6F7B]">
                {items.title}
              </div>
              <div className="text-[#6D6F7B]">
                <ItemDescription description={items.discription} />
              </div>
              <div className="flex gap-6">
                {items.tags.map((tag, index) => (
                  <button className="px-5 py-2 rounded-full  bg-[#cdcdcd23]">
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex gap-7">
                <div className="flex gap-3 items-center">
                  <AiOutlineMessage />
                  <p>{items.replies} replies</p>
                </div>

                <div className="flex gap-3 items-center">
                  <FaEye />
                  <p>{items.views} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden relative lg:w-[30%] md:flex gap-10 flex-col">
        <div className=" flex flex-col gap-2 border-2 p-4 rounded-3xl shadow-md">
          <h1 className="text-lg font-semibold text-[#858690]">
            People to follow
          </h1>
          <div>
            <div className="flex flex-col gap-4">
              {follow.map((items, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <Image
                      src={User}
                      alt="userprofile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <p>{items.name}</p>
                      <p>{items.sugestion}</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 border-2 border-black rounded-full outline-none text-center ">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-5 border-2 p-4 rounded-3xl shadow-md">
          <h1 className="text-lg font-semibold text-[#858690]">
            Recommended topics
          </h1>
          <div>
            <div className="flex flex-wrap gap-4 ">
              {sugestion.map((items, index) => (
                <button className="px-5 py-2 rounded-full  bg-[#cdcdcd23]">
                  {items.tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000057]">
          <div
            className="absolute top-5 right-5 border-2 p-2 text-2xl text-white rounded-full cursor-pointer"
            onClick={handleCloseAddPost}
          >
            <RiCloseLine />
          </div>
          <AddBlog />

        </div>
      )}
    </div>
  );
};

export default page;
