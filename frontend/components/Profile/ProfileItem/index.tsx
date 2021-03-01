import { Avatar } from "@/components/UI/Avatar";
import { Rating } from "@/components/UI/Rating";
import Link from "next/link";
import React, { memo } from "react";
import { Wrapper, Label, Title, Main } from "./styles";

interface ProfileItemProps {
  id: number;
  fullName: string;
  rate: string;
}

const ProfileItemComponent = ({ id, rate, fullName }: ProfileItemProps) => (
  <Wrapper>
    <Main>
      <Avatar size={50} href={`/profile/${id}`} />
      <Title>
        <Link href={`/profile/${id}`}>
          <a>{fullName}</a>
        </Link>
      </Title>
    </Main>
    <Rating defaultRate={rate} disabled />
  </Wrapper>
);

export const ProfileItem = memo(ProfileItemComponent);
