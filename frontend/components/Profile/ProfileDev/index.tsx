import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import useSWR from "swr";
import { Wrapper, Title, Percent } from "./styles";

const ProfileDevComponent = () => {
  const { user } = useContext(ProfileContext) as ProfileProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/worker/${query.ID}/`, {
    initialData: user,
  });

  if (error) {
    return <ErrorMessage message="Ошибка загрузки информации о достижений" />;
  }

  if (!data) {
    return <LoadingSpinner />;
  } else {
    const percent = Math.round((data.achieve * 100) / data.total_achieve);
    return (
      <Wrapper percent={percent}>
        <Title>Процент выполненных достижений</Title>
        <Percent>{percent} %</Percent>
      </Wrapper>
    );
  }
};

export const ProfileDev = memo(ProfileDevComponent);
