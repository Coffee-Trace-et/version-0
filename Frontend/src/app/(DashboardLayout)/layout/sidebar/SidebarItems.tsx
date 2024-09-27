"use client";
import React, { FC, useState, useEffect } from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import { signOut } from "@/auth";
import { UserData } from "@/utils/types/types";
import { useSession } from "next-auth/react";

const SidebarItems: FC<SidebarItemsProps> = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { data: session } = useSession();

  if (!session) {
    // redirect("/autenticacion/login");
    window.location.href = "/autenticacion/login";
    return null;
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0, marginTop: 5 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          if (
            item.role &&
            session &&
            (item.role === session?.user?.role || item.role === "all")
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
