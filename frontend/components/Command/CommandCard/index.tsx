import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import React, { memo, useContext } from "react";
import { Wrapper, Stroke, SubTitle, Label } from "./styles";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Docs } from "../Docs";

const CommandCardComponent = () => {
  const { command } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/command/${query.ID}/`, {
    initialData: command,
  });

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о команде" />
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
        {data.info.description && (
          <Stroke>
            <SubTitle>Описание</SubTitle>
            <Label>{data.info.description}</Label>
          </Stroke>
        )}
        {data.info.depart && (
          <Stroke>
            <SubTitle>Отдел</SubTitle>
            <Label>{data.info.depart}</Label>
          </Stroke>
        )}
        {data.info.motto && (
          <Stroke>
            <SubTitle>Отдел</SubTitle>
            <Label>{data.info.motto}</Label>
          </Stroke>
        )}
        <Stroke>
          <SubTitle>Документы</SubTitle>
          {data.joined ? <Docs /> : <Label>У вас нет доступа</Label>}
        </Stroke>
      </Wrapper>
    );
  }
};

export const CommandCard = memo(CommandCardComponent);
