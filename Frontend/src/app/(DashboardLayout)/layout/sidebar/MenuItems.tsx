import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    subheader: "Admin",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/Admin/Dashboard",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconLayoutDashboard,
    href: "/Admin/Users",
  },

  {
    id: uniqueId(),
    title: "Reports",
    icon: IconLayoutDashboard,
    href: "/Admin/Reports",
  },

  {
    navlabel: true,
    subheader: "Transporter",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/Transporter/Dashboard",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: IconLayoutDashboard,
    href: "/Transporter/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconLayoutDashboard,
    href: "/Transporter/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconLayoutDashboard,
    href: "/Transporter/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: IconLayoutDashboard,
    href: "/Transporter/Shipments",
  },

  {
    navlabel: true,
    subheader: "Buyer",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/Buyer/Dashboard",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: IconLayoutDashboard,
    href: "/Buyer/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconLayoutDashboard,
    href: "/Buyer/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconLayoutDashboard,
    href: "/Buyer/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: IconLayoutDashboard,
    href: "/Buyer/Shipments",
  },
  {
    navlabel: true,
    subheader: "farmer",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/farmer/Dashboard",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: IconLayoutDashboard,
    href: "/farmer/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconLayoutDashboard,
    href: "/farmer/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconLayoutDashboard,
    href: "/farmer/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: IconLayoutDashboard,
    href: "/farmer/Shipments",
  },

  {
    navlabel: true,
    subheader: "Yegara",
  },
  {
    id: uniqueId(),
    title: "Community",
    icon: IconLayoutDashboard,
    href: "/Community",
  },

  {
    id: uniqueId(),
    title: "Settings",
    icon: IconLayoutDashboard,
    href: "/Settings",
  },

  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogin,
    href: "/authentication/login",
  },

  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },

  {
    id: uniqueId(),
    title: "Teklu",
    icon: IconCopy,
    href: "/utilities/Teklu",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
