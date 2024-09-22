"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";
import Image from "next/image";
import SignUpImage from "@/../../public/images/auth/signup.svg";

const Register = () => (
  <PageContainer title="Register" description="this is Register page">
    <div className="flex">
      <div>

      </div>
      <div>
        <Image src={SignUpImage} alt="signup image" width={400} height={400}/>
      </div>

    </div>
  </PageContainer>
);

export default Register;
