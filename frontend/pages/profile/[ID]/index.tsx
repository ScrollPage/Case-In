import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { ProfileContainer } from "@/containers/profile";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { User } from "@/types/user";
import { createContext } from "react";
import { IDepart } from "@/types/depart";

export interface ProfileProps {
  user: User | null;
  depart: IDepart[] | null;
}

export const ProfileContext = createContext<ProfileProps | undefined>(
  undefined
);

export default function Profile({ user, depart }: ProfileProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Профиль</title>
      </Head>
      <ProfileContext.Provider value={{ user, depart }}>
        <ProfileContainer />
      </ProfileContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageUserId = getAsString(ctx?.params?.ID);

  let user: User | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/${pageUserId}/`)
    .then((response) => {
      user = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let depart: IDepart[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/${pageUserId}/depart/`)
    .then((response) => {
      depart = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      user,
      depart,
    },
  };
};
