import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { ProfilesContainer } from "@/containers/profiles";
import { instanceWithSSR } from "@/api";
import { createContext } from "react";
import { User } from "@/types/user";
import { getAsString } from "@/utils/getAsString";

export interface ProfilesProps {
  profiles: User[] | null;
}

export const ProfilesContext = createContext<ProfilesProps | undefined>(
  undefined
);

export default function Profiles({ profiles }: ProfilesProps) {
  return (
    <MainLayout>
      <Head>
        <title>CORP.NET / Сотрудники</title>
      </Head>
      <ProfilesContext.Provider value={{ profiles }}>
        <ProfilesContainer />
      </ProfilesContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ProfilesProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  const search = getAsString(ctx?.query?.search) ?? "";
  const sort = getAsString(ctx?.query?.sort);

  const apiLink = `${search && `&last_name__contains=${search}`}${
    sort === "1" ? "&sort=rate" : ""
  }${sort === "2" ? "&sort=last_name" : ""}`;

  let profiles: User[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`)
    .then((response) => {
      profiles = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      profiles,
    },
  };
};
