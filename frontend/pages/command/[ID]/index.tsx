import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { CommandContainer } from "@/containers/command";
import { instanceWithSSR } from "@/api";
import { getAsString } from "@/utils/getAsString";
import { ICommand } from "@/types/command";
import { createContext } from "react";
import { IPost } from "@/types/post";
import { IDoc } from "@/types/doc";
import { IMember } from "@/types/member";

export interface CommandProps {
  command: ICommand | null;
  posts: IPost[] | null;
  docs: IDoc[] | null;
  members: IMember[] | null;
}

export const CommandContext = createContext<CommandProps | undefined>(
  undefined
);

export default function Command({
  command,
  posts,
  docs,
  members,
}: CommandProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Отдел</title>
      </Head>
      <CommandContext.Provider value={{ command, posts, docs, members }}>
        <CommandContainer />
      </CommandContext.Provider>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CommandProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const pageCommandId = getAsString(ctx?.params?.ID);

  let command: ICommand | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/${pageCommandId}/`)
    .then((response) => {
      command = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let members: IMember[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/${pageCommandId}/worker/`)
    .then((response) => {
      members = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let posts: IPost[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/${pageCommandId}/post/`)
    .then((response) => {
      posts = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  let docs: IDoc[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/${pageCommandId}/doc/`)
    .then((response) => {
      docs = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      command,
      members,
      posts,
      docs,
    },
  };
};
