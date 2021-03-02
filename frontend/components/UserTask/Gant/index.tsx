import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useUser } from "@/hooks/useUser";
import { UserTaskContext, UserTaskProps } from "@/pages/profile/[ID]/task";
import { ITask } from "@/types/task";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import Chart from "react-google-charts";
import useSWR from "swr";
import { Wrapper } from "./styles";

interface GantProps {}

const format = (task: ITask, fullName: string) => {
  return [
    String(task.id),
    task.name,
    fullName,
    new Date(task.begin_time),
    new Date(task.end_time),
    null,
    task.percentage,
    null,
  ];
};

const GantComponent = ({}: GantProps) => {
  const { tasks } = useContext(UserTaskContext) as UserTaskProps;
  const { query } = useRouter();
  const pageUserId = getAsString(query.ID);
  const { fullName } = useUser();

  const { error, data } = useSWR(`/api/worker/${pageUserId}/diagramtask/`, {
    initialData: tasks,
  });

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки задач" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет задач" />
      ) : (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="Gantt"
          loader={<LoadingSpinner />}
          data={[
            [
              { type: "string", label: "Id" },
              { type: "string", label: "Задача" },
              { type: "string", label: "Исполнитель" },
              { type: "date", label: "Начальная дата" },
              { type: "date", label: "Конечная дата" },
              { type: "number", label: "Длительность" },
              { type: "number", label: "Процент выполнения" },
              { type: "string", label: "Взимодействие" },
            ],
            ...data.map((task) => format(task, fullName)),
          ]}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </Wrapper>
  );
};

export const Gant = memo(GantComponent);
