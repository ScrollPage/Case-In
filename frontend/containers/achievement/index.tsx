import { AchievementItem } from "@/components/Achievement/AchievementItem";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { IAchieve } from "@/types/achieve";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Wrapper, Title, List } from "./styles";

const renderAchievementItems = (data: IAchieve[]) =>
  data.map((item: IAchieve) => (
    <AchievementItem
      key={`achievement__item__key__${item.id}`}
      achievement={item}
    />
  ));

export interface AchievementContainerProps {
  achieve: IAchieve[] | null;
}

export const AchievementContainer: React.FC<AchievementContainerProps> = ({
  achieve,
}) => {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/worker/${query.ID}/achieve/`, {
    initialData: achieve,
  });

  return (
    <Wrapper>
      <Title>Достижения</Title>
      {error ? (
        <ErrorMessage message="Ошибка загрузки достижений" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет достижений" />
      ) : (
        <List>{renderAchievementItems(data)}</List>
      )}
    </Wrapper>
  );
};
