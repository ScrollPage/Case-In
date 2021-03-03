import { Button } from "@/components/UI/Button";
import { goToEvent } from "@/store/actions/calendly";
import { ICalendly } from "@/types/calendly";
import React from "react";
import { useDispatch } from "react-redux";
import { Title, Info, Wrapper, Inner, CheckMark } from "./styles";

interface Props {
  calendly: ICalendly;
}

const monthsData =
  "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря";

export const CalendlyItem: React.FC<Props> = ({ calendly }) => {
  const dispatch = useDispatch();
  const date = new Date(calendly.datetime);
  const months = monthsData.split(",")[date.getMonth()];
  const day = date.getDay();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  const handleGo = () => {
    dispatch(goToEvent(calendly.id));
  };

  return (
    <Wrapper>
      <Inner>
        <Title>{calendly.description}</Title>
        <Info>{`${day} ${months} в ${hours} : ${minutes}`}</Info>
      </Inner>
      {calendly.going ? (
        <CheckMark />
      ) : (
        <Button small myType="blue" width="90px" onClick={handleGo}>
          Участвовать
        </Button>
      )}
    </Wrapper>
  );
};
