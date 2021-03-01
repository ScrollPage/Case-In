import { ChangeProfileProps } from "@/components/Modal/ChangeProfile";
import { Avatar } from "@/components/UI/Avatar";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useIsYour } from "@/hooks/useIsYour";
import { ProfileContext, ProfileProps } from "@/pages/profile/[ID]";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Rating } from "../../UI/Rating";
import {
  TopMain,
  Wrapper,
  Top,
  Header,
  Title,
  Main,
  Stroke,
  Label,
  Info,
  Change,
  Hide,
  Span,
} from "./styles";
import { modalShow } from "@/store/actions/modal";
import { Button } from "@/components/UI/Button";
import { createChat } from "@/store/actions/chat";

const ProfileCardComponent = () => {
  const dispatch = useDispatch();
  const { user } = useContext(ProfileContext) as ProfileProps;
  const { query, push } = useRouter();
  const [isShow, setIsShow] = useState(false);
  const isYourPage = useIsYour();

  const { data: userData, error: userError } = useSWR(
    `/api/initiative/${query.ID}/`,
    {
      initialData: user,
    }
  );

  const handleChange = () => {
    if (userData) {
      dispatch(
        modalShow<ChangeProfileProps>("CHANGE_PROFILE", { user: userData })
      );
    }
  };

  const handleMessage = () => {
    if (userData) {
      if (userData.has_chat) {
        push({ pathname: "/im", query: { id: userData.chat_id } }, undefined, {
          shallow: true,
        });
      } else {
        dispatch(createChat());
      }
    }
  };

  const handleTask = () => {
    push({ pathname: `/profile/${query.ID}/task` }, undefined, {
      shallow: true,
    });
  };

  const hanldeShowInfo = () => {
    setIsShow(true);
  };

  if (userError) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о пользователе" />
      </Wrapper>
    );
  }

  if (!userData) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Top>
          <TopMain>
            <Avatar size={60} href={`/profile/${userData.id}`} />
            <Header>
              <Title>{`${userData.info.first_name} ${userData.info.last_name}`}</Title>
              <Rating
                defaultRate={userData.rate ?? "0"}
                disabled={isYourPage}
              />
            </Header>
          </TopMain>
          {isYourPage && (
            <Change onClick={handleChange}>
              <img src="/change.svg" alt="Изменить информацию" />
            </Change>
          )}
        </Top>
        <Main>
          {!isYourPage && (
            <Button onClick={handleMessage} width="100%" myType="outline">
              Написать сообщение
            </Button>
          )}
          <Button onClick={handleTask} width="100%" myType="outline">
            Задачи
          </Button>
          {!isShow && <Span onClick={hanldeShowInfo}>Развернуть</Span>}
        </Main>
        {isShow && (
          <Hide>
            <Stroke>
              <Label>E-mail</Label>
              <Info>{userData.email}</Info>
            </Stroke>
            <Stroke>
              <Label>Номер телефона</Label>
              <Info>{userData.info.phone_number}</Info>
            </Stroke>
            <Stroke>
              <Label>Дата рождения</Label>
              <Info>{userData.info.phone_number}</Info>
            </Stroke>
          </Hide>
        )}
      </Wrapper>
    );
  }
};

export const ProfileCard = memo(ProfileCardComponent);
