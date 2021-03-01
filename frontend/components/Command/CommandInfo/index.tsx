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

const renderButtons = (data: ICommand) => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { userId } = useUser();

  const handleDelete = () => {
    if (data) {
      dispatch(
        modalShow<DeleteCommandProps>("DELETE_COMMAND", { id: data.info.id })
      );
    }
  };

  const handleChange = () => {
    if (data) {
      dispatch(
        modalShow<ChangeCommandProps>("CHANGE_COMMAND", {
          id: data.info.id,
          command: data,
        })
      );
    }
  };

  const handleExit = () => {
    if (data) {
      dispatch(
        modalShow<ExitCommandProps>("EXIT_COMMAND", {
          commandId: data.info.id,
          membershipId: data.membership_id,
        })
      );
    }
  };

  const handleChat = () => {
    if (data) {
      push({ pathname: "/im", query: { id: data.chat_id } }, undefined, {
        shallow: true,
      });
    }
  };

  const handleTask = () => {
    push({ pathname: `/command/${query.ID}/task` }, undefined, {
      shallow: true,
    });
  };

  return (
    <ButtonsWrapper>
      {Number(userId) === data.admin.id && (
        <>
          <Button width="100%" myType="outline" onClick={handleChange}>
            Редактировать
          </Button>
          <Button width="100%" myType="outline" onClick={handleDelete}>
            Распустить отдел
          </Button>
        </>
      )}
      {data.joined && (
        <Button width="100%" myType="outline" onClick={handleExit}>
          Покинуть отдел
        </Button>
      )}
      <Button width="100%" myType="outline" onClick={handleTask}>
        План отдела
      </Button>
      <Button width="100%" myType="outline" onClick={handleChat}>
        Перейти к диалогу отдела
      </Button>
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
