import {
  CalendlyForm,
  CalendlyFormValues,
} from "@/components/Calendly/CalendlyForm";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface AddCalendlyEventProps {}

interface IAddCalendlyEvent extends AddCalendlyEventProps {
  setClose: () => void;
}

const AddCalendlyEventComponent: React.FC<IAddCalendlyEvent> = ({
  setClose,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values: CalendlyFormValues) => {
    // dispatch(AddCalendlyEvent(values));
    console.log(values);
    setClose();
  };

  return (
    <Wrapper>
      <CalendlyForm handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const AddCalendlyEvent = memo(AddCalendlyEventComponent);
