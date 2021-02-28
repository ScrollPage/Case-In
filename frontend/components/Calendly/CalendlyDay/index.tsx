import { Button } from "@/components/UI/Button";
import React from "react";
import { Wrapper, Day, Inner, Title, Info, Event } from "./styles";

interface Props {
  calendly: any;
}

export const CalendlyItem: React.FC<Props> = ({ calendly }) => {
  return (
    <Wrapper>
      <Day>
        <Title>{calendly.day}</Title>
      </Day>
      <Inner>
        {calendly.events.length === 0 ? (
          <Info>Нет мероприятий</Info>
        ) : (
          calendly.events.map((event: any) => (
            <CalendlyEvent
              key={`Calendly__event__key__${event.id}`}
              event={event}
            />
          ))
        )}
      </Inner>
    </Wrapper>
  );
};

interface EventProps {
  event: any;
}

const CalendlyEvent: React.FC<EventProps> = ({ event }) => {
  return (
    <Event>
      <Title>{event.time}</Title>
      <Info>{event.name}</Info>
      <Button small myType={event.isGo ? "outline" : "blue"} width="60px">
        {event.isGo ? "Отменить" : "Пойти"}
      </Button>
    </Event>
  );
};
