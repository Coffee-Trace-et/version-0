"use client";
import { AdUnits } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import AddProduct from "../../components/product/addProduct";
import AddUsers from "../../components/users/addUser";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddUser = () => {
    setOpen(!open);
  };
  const handleCloseAddUser = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://cofeetracebackend-2.onrender.com/api/v0/user/get-all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      setUsers(data.result);
    };
    fetchUsers();
  }, [session]);

  // Filter users based on the search term
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000057] ">
          <div
            className="absolute top-5 right-5 border-2 p-2 text-2xl text-white rounded-full "
            onClick={handleCloseAddUser}
          >
            <RiCloseLine />
          </div>
          <AddUsers  setOpen={setOpen}/>
        </div>
      )}

      <div className="flex justify-between md:flex-row flex-col gap-2 mb-10">
        <input
          type="text"
          className="border md:w-[562px] w-full p-2 rounded-md shadow-md"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <div className="gap-2 flex md:flex-row flex-col-reverse">
          <button className="border md:w-[131px] w-full p-2 rounded-md font-semibold bg-white shadow-md">
            <div className="flex items-center gap-1" onClick={handleAddUser}>
              <IoMdAdd className="text-black" />
              Create User
            </div>
          </button>
          <select
            name="filters"
            className="p-2 rounded-md border w-full md:w-[191px] shadow-md font-medium"
            placeholder="Filter by role"
          >
            <option value="Farmers">Farmers</option>
            <option value="Buyer">Buyer</option>
            <option value="Transporter">Transporter</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item, i) => (
            <div
              className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg w-[340px] border"
              key={i}
            >
              <Image
                src={"/images/profile/user-1.jpg"}
                width={70}
                height={70}
                alt="profile pic"
                className="rounded-full"
              />
              <div className="flex flex-col justify-between">
                <div className="mb-2">
                  <p className="font-semibold capitalize">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
                <div className="flex gap-6 mb-4">
                  <div className="text-center">
                    <p className="font-bold ">
                      {item.transaction / 1000}K+
                    </p>
                    <p className="text-xs text-gray-500">Transactions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold ">{item.following / 1000}K+</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold ">{item.followers / 1000}K+</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link href={"/message"}>
                    <button className=" bg-gray-200 w-[94px] h-[32px] text-gray-500 rounded-md hover:bg-gray-600 hover:text-white">
                      Message
                    </button>
                  </Link>
                  <button className=" bg-red-500 w-[94px] h-[32px] text-white rounded-md hover:bg-red-600">
                    Block
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </section>
  );
};

export default Page;
