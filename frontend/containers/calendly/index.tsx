import { CalendlyItem } from "@/components/Calendly/CalendlyDay";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ICalendly } from "@/types/calendly";
import React from "react";
import useSWR from "swr";
import { Wrapper, Title, List } from "./styles";

const renderCalendlyItems = (data: ICalendly[]) =>
  data.map((item: any) => (
    <CalendlyItem key={`Calendly__item__key__${item.id}`} calendly={item} />
  ));

export interface CalendlyContainerProps {
  calendly: ICalendly[] | null;
}

export const CalendlyContainer: React.FC<CalendlyContainerProps> = ({
  calendly,
}) => {
  const { data, error } = useSWR(`/api/worker/calendlytask/`, {
    initialData: calendly,
  });

  return (
    <Wrapper>
      <Title>Календарь</Title>
      <List>
        {error ? (
          <ErrorMessage message="Ошибка загрузки мероприятий" />
        ) : !data ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <EmptyMessage message="Нет мероприятий" />
        ) : (
          renderCalendlyItems(data)
        )}
      </List>
    </Wrapper>
  );
};
