import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";
import { BsCart3 } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiCreditCard } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { LuUsers2 } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
// import dashboardlogo from "/images/icons/dashboardlogo.svg";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";

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
    role: "admin",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: FaRegUser,
    href: "/Admin/Users",
    role: "admin",
  },

  {
    id: uniqueId(),
    title: "Reports",
    icon: MdOutlineReportGmailerrorred,
    href: "/Admin/Reports",
    role: "admin",
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
    role: "driver",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: FaPeopleCarryBox,
    href: "/Transporter/Products",
    role: "driver",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/Transporter/Orders",
    role: "driver",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/Transporter/Transactions",
    role: "driver",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
    href: "/Transporter/Shipments",
    role: "driver",
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
    role: "merchant",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: FaPeopleCarryBox,
    href: "/Buyer/Products",
    role: "merchant",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/Buyer/Orders",
    role: "merchant",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/Buyer/Transactions",
    role: "merchant",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
    href: "/Buyer/Shipments",
    role: "merchant",
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
    role: "farmer",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: FaPeopleCarryBox,
    href: "/farmer/Products",
    role: "farmer",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/farmer/Orders",
    role: "farmer",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/farmer/Transactions",
    role: "farmer",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
    href: "/farmer/Shipments",
    role: "farmer",
  },

  {
    navlabel: true,
    subheader: "Yegara",
  },
  {
    id: uniqueId(),
    title: "Community",
    icon: HiMiniUsers,
    href: "/Community",
    role: "all",
  },

  {
    id: uniqueId(),
    title: "Settings",
    icon: IoMdSettings,
    href: "/Settings",
    role: "all",
  },

  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogin,
    href: "/authentication/login",
    role: "all",
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
    role: "",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
    role: "",
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
