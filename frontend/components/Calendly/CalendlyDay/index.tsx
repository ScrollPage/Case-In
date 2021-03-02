import { ICalendly } from "@/types/calendly";
import React from "react";
import { Title, Info, Wrapper } from "./styles";

interface Props {
  calendly: ICalendly;
}

const monthsData =
  "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря";

export const CalendlyItem: React.FC<Props> = ({ calendly }) => {
  const date = new Date(calendly.datetime);
  const months = monthsData.split(",")[date.getMonth()];
  const day = date.getDay();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return (
    <Wrapper>
      <Title>{`${day} ${months} в ${hours} : ${minutes}`}</Title>
      <Info>{calendly.description}</Info>
    </Wrapper>
  );
};
