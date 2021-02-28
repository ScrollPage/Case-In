import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { AchievementContainer } from "@/containers/achievement";

export interface AchievementProps {}

export default function Achievement({}: AchievementProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Достижения</title>
      </Head>
      <AchievementContainer />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<AchievementProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};
