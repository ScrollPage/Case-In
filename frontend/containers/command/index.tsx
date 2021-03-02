import { CommandCard } from "@/components/Command/CommandCard";
import { CommandInfo } from "@/components/Command/CommandInfo";
import React, { useContext } from "react";
import { Wrapper, Main, Side } from "./styles";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { Posts } from "@/components/Post/Posts";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Members } from "@/components/Command/Members";

export const CommandContainer = () => {
  return (
    <Wrapper>
      <Main>
        <CommandCard />
        <Posts />
      </Main>
      <Side>
        <CommandInfo />
        <Members />
      </Side>
    </Wrapper>
  );
};
