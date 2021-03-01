import { Button } from "@/components/UI/Button";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";
import { exitOrInviteCommand } from "@/store/actions/command";

export interface ExitCommandProps {}

interface IExitCommand extends ExitCommandProps {
  setClose: () => void;
}

const ExitCommandComponent: React.FC<IExitCommand> = ({ setClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(exitOrInviteCommand());
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите выйти из отдела?</Title>
      <Inner>
        <Button onClick={handleDelete} myType="outline">
          Выйти
        </Button>
        <Button onClick={setClose} myType="outline">
          Отменить
        </Button>
      </Inner>
    </Wrapper>
  );
};

export const ExitCommand = memo(ExitCommandComponent);
