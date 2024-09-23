"use client";
import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import SwitchButton from "../components/setting/swich";

const page = () => {
  const [notification, setNotification] = useState(false);
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h1 className="font-semibold text-xl py-4">Edit Profile</h1>
          <div className="p-4 pb-10 flex flex-col gap-3 shadow-md border-2 rounded-md ">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Your Name</label>
              <input
                type="text"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Store Name</label>
              <input
                type="text"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Country</label>
              <select className="p-4 border-2 border-gray-200 rounded-md outline-none">
                <option value="Farmer">Adiss Abeba</option>
                <option value="Buyer">Yirgachefe</option>
                <option value="Transporter">Harar</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Currency</label>
              <select className="p-4 border-2 border-gray-200 rounded-md outline-none">
                <option value="Farmer">Birr</option>
                <option value="Buyer">USD</option>
                <option value="Transporter">Pound</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Phone</label>
              <input
                type="text"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Address</label>
              <input
                type="text"
                className="p-4 border-2 border-gray-200 rounded-md outline-none "
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:w-1/2">
          <div>
            <h1 className="font-semibold text-xl py-4">Change Password</h1>
            <div className="p-4 pb-10 flex flex-col gap-3 shadow-md border-2 rounded-md ">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Current Password</label>
                <input
                  type="password"
                  className="p-4 border-2 border-gray-200 rounded-md outline-none "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">New Password</label>
                <input
                  type="password"
                  className="p-4 border-2 border-gray-200 rounded-md outline-none "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  className="p-4 border-2 border-gray-200 rounded-md outline-none "
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-xl py-4">Notifications</h1>
            <div className="p-4 pb-10 flex flex-col gap-3 shadow-md border-2 rounded-md ">
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-center p-4 border-2 border-gray-200 rounded-md">
                  <div className="flex flex-col">
                    <div className="text-lg">Order Confirmation</div>
                    <div>
                      You will be notified when customer order any product
                    </div>
                  </div>
                  <div className="w-1/5">
                    <SwitchButton
                      isOn={notification}
                      onToggle={setNotification}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-center p-4 border-2 border-gray-200 rounded-md">
                  <div className="flex flex-col">
                    <div className="text-lg">Order Status Changed</div>
                    <div>
                      You will be notified when customer make changes to the
                      order
                    </div>
                  </div>
                  <div className="w-1/5">
                    <SwitchButton
                      isOn={notification}
                      onToggle={setNotification}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-center p-2 border-2 border-gray-200 rounded-md">
                  <div className="flex flex-col w-4/5">
                    <div className="text-lg">Email Notification</div>
                    <div>
                      Turn on email notification to get updates through email
                    </div>
                  </div>
                  <div className="w-1/5">
                    <SwitchButton
                      isOn={notification}
                      onToggle={setNotification}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center p-2 justify-end">
        <button className={`py-2 text-xl px-7 border-2 bg-[#982B1C] text-white rounded-md`}>Save</button>
      </div>
    </div>
  );
};

export default page;
