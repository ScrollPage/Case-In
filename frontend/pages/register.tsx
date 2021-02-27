import Head from "next/head";
import React from "react";
import { ensureRedirectToData } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import { AuthLayout } from "@/components/Layout/AuthLayout";
import { RegisterContainer } from "@/containers/register";

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  return (
    <AuthLayout>
      <Head>
        <title>BNET / Регистрация</title>
      </Head>
      <RegisterContainer />
    </AuthLayout>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps<RegisterProps> = async (
  ctx
) => {
  ensureRedirectToData(ctx);
  return {
    props: {},
  };
};
