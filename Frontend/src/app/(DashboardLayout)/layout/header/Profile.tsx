import React, { useState } from "react";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";

const Profile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative sm:w-52 h-16 border border-[#cdcdcd] rounded-full sm:rounded-lg">
      <div
        onClick={handleToggleDropdown}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/images/profile/user-1.jpg"
          alt="User"
          className="w-14 h-16  rounded-full sm:rounded-lg"
        />
        <div className=" hidden sm:flex  gap-4 py-1 items-center">
          <div className=" flex-col items-start">
            <div className="text-[#747C8A] text-lg font-medium">John Doe</div>
            <div className="text-[#B4B4B4] text-lg font-medium">Farmer</div>
          </div>
          <FaCaretDown />
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg w-48 sm:w-52 z-10">
          <ul className="list-none p-0 m-0">
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
              onClick={handleCloseDropdown}
            >
              My Profile
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
              onClick={handleCloseDropdown}
            >
              My Account
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
              onClick={handleCloseDropdown}
            >
              My Tasks
            </li>
            <li className="py-2 px-4 text-center w-full">
              <Link
                href="/authentication/login"
                className="inline-block w-full py-2 px-4 border border-[#49BEFF] text-[#49BEFF] rounded-md hover:bg-[#49BEFF] hover:text-white transition"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
