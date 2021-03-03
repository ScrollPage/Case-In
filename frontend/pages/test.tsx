import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { TestContainer } from "@/containers/test";
import { ServerTest } from "@/types/test";

export interface TestProps {
  serverTests: ServerTest[] | null;
}

export default function Test({ serverTests }: TestProps) {
  return (
    <MainLayout>
      <Head>
        <title>CORP.NET / Тесты</title>
      </Head>
      <TestContainer serverTests={serverTests} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<TestProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  let serverTests: ServerTest[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/test/`)
    .then((response) => {
      serverTests = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      serverTests,
    },
  };
};
