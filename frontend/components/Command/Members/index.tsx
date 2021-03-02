import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { IMember } from "@/types/member";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import useSWR from "swr";
import { Wrapper, Title, Stroke, Info } from "./styles";

const renderMembers = (members: IMember[]) => {
  return members.map((member, index) => {
    const { id, first_name, last_name} = member.user;
    return (
      <Stroke key={`membersitem__key__${index}`}>
        <Info>
          <Link href={`/profile/${id}`}>
            <a>{`${first_name} ${last_name}`}</a>
          </Link>
        </Info>
      </Stroke>
    );
  });
};

const MembersComponent = () => {
  const { members } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/depart/${query.ID}/worker/`, {
    initialData: members,
  });

  return (
    <Wrapper>
      <Title>Участники</Title>
      {error ? (
        <ErrorMessage message="Ошибка загрузки участников" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет участников" />
      ) : (
        renderMembers(data)
      )}
    </Wrapper>
  );
};

export const Members = memo(MembersComponent);
