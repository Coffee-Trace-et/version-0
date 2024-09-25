"use client";
import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useState, useEffect } from "react";

import { UserData } from "@/utils/types/types";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const [userDataSessetion, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();
  const pathDirect = pathname;
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
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0, marginTop: 5 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}

          if (
            item.role &&
            userDataSessetion &&
            (item.role === userDataSessetion.role || item.role === "all")
          ) {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
