"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import Image from "next/image";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <div>
        <form action="" className="">
          <input type="text" className="" />
          <input type="text" />
          <select name="" id="">
            <option value="Farmer">Farmer</option>
            <option value="Buyer">Buyer</option>
            <option value="Transporter">Transporter</option>
          </select>

          <div>
            <input type="checkbox" /> Remember me
          </div>
          <Link href="/auth/forgot-password">Forgot Password?</Link>
          <button type="submit">Submit</button>
        </form>
        <Image
          src="/images/undraw_Login_re_4vu2.svg"
          alt="login"
          width={500}
          height={500}
        />
      </div>
    </PageContainer>
  );
};
export default Login2;
