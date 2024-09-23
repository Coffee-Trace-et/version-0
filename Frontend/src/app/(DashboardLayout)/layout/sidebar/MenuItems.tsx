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
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: FaRegUser,
    href: "/Admin/Users",
  },

  {
    id: uniqueId(),
    title: "Reports",
    icon: MdOutlineReportGmailerrorred,
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
    icon: FaPeopleCarryBox,
    href: "/Transporter/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/Transporter/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/Transporter/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
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
    icon: FaPeopleCarryBox,
    href: "/Buyer/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/Buyer/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/Buyer/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
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
    icon: FaPeopleCarryBox,
    href: "/farmer/Products",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: BsCart3,
    href: "/farmer/Orders",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: BiCreditCard,
    href: "/farmer/Transactions",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: CiDeliveryTruck,
    href: "/farmer/Shipments",
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
  },

  {
    id: uniqueId(),
    title: "Settings",
    icon: IoMdSettings,
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
