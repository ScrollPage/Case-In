import { Rating } from "@/components/UI/Rating";
import { Avatar } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/Button";
import React, { memo, useContext } from "react";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { modalShow } from "@/store/actions/modal";
import { DeleteCommandProps } from "@/components/Modal/DeleteCommand";
import { ChangeCommandProps } from "@/components/Modal/ChangeCommand";
import { ICommand } from "@/types/command";
import {
  Wrapper,
  Main,
  Bottom,
  Title,
  SubTitle,
  ButtonsWrapper,
  Inner,
} from "./styles";
import { ExitCommandProps } from "@/components/Modal/ExitCommand";
import { useUser } from "@/hooks/useUser";
import { AddMemberProps } from "@/components/Modal/AddMember";
import { AddCalendlyEventProps } from "@/components/Modal/AddCalendlyEvent";

const renderButtons = (data: ICommand) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userId } = useUser();

  const handleDelete = () => {
    if (data) {
      dispatch(
        modalShow<DeleteCommandProps>("DELETE_COMMAND", { id: data.id })
      );
    }
  };

  const handleChange = () => {
    if (data) {
      dispatch(
        modalShow<ChangeCommandProps>("CHANGE_COMMAND", {
          id: data.id,
          command: data,
        })
      );
    }
  };

  const handleExit = () => {
    if (data) {
      dispatch(modalShow<ExitCommandProps>("EXIT_COMMAND", {}));
    }
  };

  const handleChat = () => {
    if (data) {
      push({ pathname: "/im", query: { id: data.chat_id } }, undefined, {
        shallow: true,
      });
    }
  };

  const handleAdd = () => {
    dispatch(modalShow<AddMemberProps>("ADD_MEMBER", {}));
  };

  const handleCalendly = () => {
    dispatch(modalShow<AddCalendlyEventProps>("ADD_CALENDLY_EVENT", {}));
  };

  return (
    <ButtonsWrapper>
      {Number(userId) === data.admin.id && (
        <>
          <Button width="100%" myType="outline" onClick={handleAdd}>
            Добавить участника
          </Button>
          <Button width="100%" myType="outline" onClick={handleChange}>
            Редактировать
          </Button>
          <Button width="100%" myType="outline" onClick={handleDelete}>
            Распустить
          </Button>
          <Button width="100%" myType="outline" onClick={handleCalendly}>
            Добавить мероприятие
          </Button>
        </>
      )}
      {data.joined && Number(userId) !== data.admin.id && (
        <Button width="100%" myType="outline" onClick={handleExit}>
          Покинуть
        </Button>
      )}
      {(data.joined || Number(userId) === data.admin.id) && (
        <Button width="100%" myType="outline" onClick={handleChat}>
          Беседа
        </Button>
      )}
    </ButtonsWrapper>
  );
};

const CommandInfoComponent = () => {
  const { command } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/depart/${query.ID}/`, {
    initialData: command,
  });

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации об отделе" />
      </Wrapper>
    );
  }

  if (!data) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Main>
          <Inner>
            <Avatar size={80} />
            <Title>{data.name}</Title>
            <SubTitle>
              Участников: <span>{data.num_workers}</span>
            </SubTitle>
          </Inner>
          <Rating defaultRate={data.rate ?? "0"} disabled />
        </Main>
        <Bottom>{renderButtons(data)}</Bottom>
      </Wrapper>
    );
  }
};

export const CommandInfo = memo(CommandInfoComponent);
