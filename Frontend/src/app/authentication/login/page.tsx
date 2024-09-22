"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";
import { TbBrandApple } from "react-icons/tb";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <div className="flex items-center justify-center  min-h-screen  bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 md:flex md:space-x-10">
          <form
            action=""
            className="flex flex-col space-y-4 md:space-y-8  md:w-1/2 md:mt-16"
          >
            {/* <div className="mb-4 flex justify-center">
              <Logo />
            </div> */}
            <div className="flex justify-center text-bold">
              <h2 className="text-2xl  text-gray-800 font-bold">Login</h2>
            </div>

            <input
              type="text"
              placeholder="Username"
              className="bg-gray-200 px-4 py-2 min-w-[330px] max-w-[350px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 px-4 py-2 rounded-lg min-w-[330px] max-w-[350px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="bg-gray-200 px-4 py-2 min-w-[330px] max-w-[350px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
              <option value="Transporter">Transporter</option>
            </select>

            <div className="flex items-center min-w-[330px] max-w-[350px] justify-between">
              <div>
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 max-w-[350px]"
            >
              Submit
            </button>
            <div>
              <p className="text-center font-[calibri]">Or login with</p>
              <div className="flex justify-center space-x-4 my-2">
                <div className="bg-red-100 w-[76px] h-[30px] rounded-full flex justify-center items-center ">
                  <FaGoogle className="text-red-500 " />
                </div>
                <div
                  className="bg-blue-100 w-[76px] h-[30px] rounded-full flex justify-center items-center "
                  style={{ color: "#3b5998" }}
                >
                  <RiFacebookCircleFill className="text-blue-500 " />
                </div>
                <div
                  className="bg-[#F3F4F6] w-[76px] h-[30px] rounded-full flex justify-center items-center "
                  style={{ color: "" }}
                >
                  <TbBrandApple />
                </div>
              </div>
            </div>
          </form>

          <div className="hidden md:block md:w-1/2">
            <Image
              src="/images/auth/login.svg"
              alt="login"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Login2;
