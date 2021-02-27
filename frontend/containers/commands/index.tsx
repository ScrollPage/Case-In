import { CommandAdd } from "@/components/Command/CommandAdd";
import { Commands } from "@/components/Command/Commands";
import { Filter } from "@/components/UI/Filter";
import React from "react";
import { Wrapper, Main, Side } from "./styles";
import { Search } from "@/components/UI/Search";

export interface CommandsContainerProps {}

export const CommandsContainer: React.FC<CommandsContainerProps> = ({}) => {
  return (
    <Wrapper>
      <Main>
        <Commands />
      </Main>
      <Side>
        <CommandAdd />
        <Search />
        <Filter />
      </Side>
    </Wrapper>
  );
};
