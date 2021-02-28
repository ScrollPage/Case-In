import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { TestContainer } from "@/containers/test";

export interface TestProps {}

export default function Test({}: TestProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Тесты</title>
      </Head>
      <TestContainer />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<TestProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};
