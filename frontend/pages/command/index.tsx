import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { CommandsContainer } from "@/containers/commands";
import { instanceWithSSR } from "@/api";
import { ICommand } from "@/types/command";
import { createContext } from "react";
import { getAsString } from "@/utils/getAsString";

export interface CommandsProps {
  commands: ICommand[] | null;
}

export const CommandsContext = createContext<CommandsProps | undefined>(
  undefined
);

export default function Commands({ commands }: CommandsProps) {
  return (
    <MainLayout>
      <Head>
        <title>CORP.NET / Отделы</title>
      </Head>
      <CommandsContext.Provider value={{ commands }}>
        <CommandsContainer />
      </CommandsContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CommandsProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  const search = getAsString(ctx?.query?.search) ?? "";
  const sort = getAsString(ctx?.query?.sort);

  const apiLink = `${search && `&name__contains=${search}`}${
    sort === "1" ? "&sort=rate" : ""
  }${sort === "2" ? "&sort=name" : ""}`;

  let commands: ICommand[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`)
    .then((response) => {
      commands = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      commands,
    },
  };
};
