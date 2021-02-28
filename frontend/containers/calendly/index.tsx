import { CalendlyItem } from "@/components/Calendly/CalendlyDay";
import React from "react";
import { AddEvent, Wrapper, Title, List, Week } from "./styles";

const data: any = [
  {
    id: 1,
    day: "Пн",
    events: [
      { id: 1, time: "11:30", name: "Чаепитие", isGo: true },
      { id: 2, time: "15:00", name: "Собрание отдела", isGo: false },
    ],
  },
  {
    id: 2,
    day: "Вт",
    events: [],
  },
  {
    id: 3,
    day: "Ср",
    events: [],
  },
  {
    id: 4,
    day: "Чт",
    events: [{ id: 3, time: "18:00", name: "Корпоратив", isGo: true }],
  },
  {
    id: 5,
    day: "Пт",
    events: [],
  },
  {
    id: 6,
    day: "Сб",
    events: [],
  },
  {
    id: 7,
    day: "Вс",
    events: [],
  },
];

const renderCalendlyItems = (data: any) =>
  data.map((item: any) => (
    <CalendlyItem key={`Calendly__item__key__${item.id}`} calendly={item} />
  ));

export const CalendlyContainer = () => {
  return (
    <Wrapper>
      <Title>Календарь</Title>
      <Week>Текущая неделя</Week>
      {/* <List>{renderCalendlyItems(data)}</List> */}
      <List>{renderCalendlyItems(data)}</List>
      <AddEvent />
    </Wrapper>
  );
};
