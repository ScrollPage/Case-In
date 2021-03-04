import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { AchievementContainer } from "@/containers/achievement";
import { getAsString } from "@/utils/getAsString";
import { IAchieve } from "@/types/achieve";

export interface AchievementProps {
  achieve: IAchieve[] | null;
}

export default function Achievement({ achieve }: AchievementProps) {
  return (
    <MainLayout>
      <Head>
        <title>CORP.NET / Достижения</title>
      </Head>
      <AchievementContainer achieve={achieve} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<AchievementProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageUserId = getAsString(ctx?.params?.ID);
  let achieve: IAchieve[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/${pageUserId}/achieve/`)
    .then((response) => {
      achieve = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });
  return {
    props: {
      achieve,
    },
  };
};
