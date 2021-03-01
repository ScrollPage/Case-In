import { Avatar } from "@/components/UI/Avatar";
import { Rating } from "@/components/UI/Rating";
import { useWindowSize } from "@/hooks/useWIndowSize";
import Link from "next/link";
import React, { memo } from "react";
import { Wrapper, Main, Label, Title } from "./styles";

interface CommandItemProps {
  id: number;
  rate: string;
  name: string;
  numMembers: number;
}

const CommandItemComponent = ({
  id,
  rate,
  name,
  numMembers,
}: CommandItemProps) => {
  const { width } = useWindowSize();
  return (
    <Wrapper>
      <Avatar size={width ?? 1000 < 576 ? 40 : 80} href={`/command/${id}`} />
      <Main>
        <Title>
          <Link href={`/command/${id}`}>
            <a>{name}</a>
          </Link>
        </Title>
        <Rating defaultRate={rate} disabled />
        <Label>Участников: {numMembers}</Label>
      </Main>
    </Wrapper>
  );
};

export const CommandItem = memo(CommandItemComponent);
