"use client";
import React, { useEffect, useState } from "react";
import { UserData } from "@/utils/types/types";

const Page = () => {
  const [userDataSessetion, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataFromStorage = localStorage.getItem("userData");

    if (userDataFromStorage) {
      console.log("Dashboard Page: User data found:", userDataFromStorage);
      // Parse the user data if needed and set it in state
      setUserData(JSON.parse(userDataFromStorage));
    } else {
      console.log("Dashboard Page: No user data found.");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Dashboard is listed here</p>
      {userDataSessetion && (
        <div>
          <h2>User Information</h2>
          <p>Name: {userDataSessetion.name}</p>
          <p>Email: {userDataSessetion.email}</p>
          <p>Role: {userDataSessetion.role}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
